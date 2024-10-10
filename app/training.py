from flask import Flask, request, jsonify
import numpy as np
import time
import pandas as pd
import csv
import json
from app.API.rl import *

class Training_rl():
    def __init__(self, power, speed, hatch):
        with app.open_resource('data/model_params_train.json', 'r') as jsonf1:
            data = json.load(jsonf1)
        self.timestep = data['timestep']  # Number of timesteps in an episode
        self.epochs = data['epochs']  # Total number of epochs
        self.model_alpha = data['model_alpha']  # Learning rate of the Bellmann equation
        self.model_gamma = data['model_gamma']  # Discount factor of the Bellmann equation
        self.model_epsilon = data['model_epsilon']  # Initial value for epsilon-greedy algorithm
        self.store_data = bool(data['store_data'])  # Boolean value whether to store data1 locally or not
        self.parameters = []
        for p in power:
            for s in speed:
                for h in hatch:
                    self.parameters.append((p, s, h))
        self.power = power
        self.speed = speed
        self.hatch = hatch
        self.max_steps = len(power) * len(speed) * len(hatch)
        if self.max_steps >= 1000:
            self.max_steps = 1000

    def training(self):
        train_results = pd.DataFrame(
            columns=['timesteps', 'test number', 'alpha', 'gamma', 'total steps', 'steps to optimal', \
                     'optimal state', 'reward', 'reward per episode', 'time taken', 'no. of states visited'])

        for j in range(0, self.epochs):  # For each epoch
            t1 = time.perf_counter()
            # Creating instance of the environment
            env = CustomEnv(self.parameters, self.timestep, self.model_alpha, self.model_gamma, self.model_epsilon)

            episode = 0  # Initialising episode number to 0
            states = set()  # Total number of states visited in the epoch
            states_visited = []  # Total number of states visited in the episode
            epoch_reward = 0  # Total value of rewards in the epoch
            episode_rewards = []  # Set containing each episode's total reward

            # As long as the maximum timesteps in an epoch is not exceeded
            while (env.steps < self.max_steps):
                env.reset(self.timestep)  # Resetting the environment
                done = False  # Setting done to be False so the episode restarts
                episode += 1
                total_reward = 0  # Episode reward initialised to zero before start of episode

                while not done:  # For each episode
                    reward, done = env.step(self.power, self.speed, self.hatch)
                    total_reward += reward
                    epoch_reward += reward
                    states_visited.append(env.state)
                    states.add(env.state)

                print('Episode', episode, ' of epoch', j + 1, 'completed')
                # print('States visited in episode ', episode, 'of test', j+1, 'are ', states_visited)

                episode_rewards.append(total_reward)
                print('------------------')
                states_visited.clear()

            t2 = time.perf_counter()  # Ending timer for the epoch
            time_taken = t2 - t1

        row = pd.Series([self.timestep, j + 1, env.alpha, env.gamma, env.steps, env.optimal_steps, env.optimal_state, \
                             env.rmax, epoch_reward / episode, time_taken, len(states)], \
                            index=train_results.columns)
        train_results.loc[len(train_results)] = row

        train_results.sort_values('reward', ascending=False)
        print(env.results, type(env.results))
        print("Optimal parameter configurations (P, v, h):\n")

        opt_parameter=[]
        for i in range(len(train_results)):
            opt_state = train_results['optimal state'][i]
            print(f"Epoch {i + 1}: {self.parameters[int(opt_state)]}")
            opt_parameter.append(self.parameters[int(opt_state)])

        return opt_parameter

