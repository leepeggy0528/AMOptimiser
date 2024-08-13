import tensorflow as tf
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense
from deap import base, creator, tools, algorithms
import numpy as np


# Define the neural network
def create_neural_network(arr):
    model = Sequential([
        Dense(64, input_dim=arr, activation='relu'),
        Dense(32, activation='relu'),
        Dense(1, activation='linear')
    ])
    model.compile(optimizer='adam', loss='mse')
    return model


# Example of training the neural network
def train_neural_network(model, X_train, y_train, epochs=100, batch_size=32):
    loss_fn = tf.keras.losses.SparseCategoricalCrossentropy()
    optimizer = tf.keras.optimizers.SGD(0.00001)
    for epoch in range(epochs):

        # Use TensorFlow's GradientTape to record operations for automatic differentiation
        with tf.GradientTape() as tape:

            # Forward pass: Compute predictions (logits) by passing training data through the neural network
            logits = model(X_train)

            # Calculate the loss by comparing predicted logits with the true training labels (y_train)
            loss_value = loss_fn(y_train, logits)

        # Backpropagation: Compute gradients of the loss with respect to model parameters
        grads = tape.gradient(loss_value, model.trainable_variables)

        # Apply the computed gradients to update the model's parameters using the specified optimizer
        optimizer.apply_gradients(zip(grads, model.trainable_variables))

        # Print the loss at regular intervals to monitor training progress
        if (epoch + 1) % 100 == 0:
            model.fit(X_train, y_train, epochs=epochs, batch_size=batch_size)
            print(f"Epoch {epoch + 1}/{epochs}, Loss: {loss_value.numpy()}")





# Define the GA problem
creator.create("FitnessMin", base.Fitness, weights=(1.0, ))
creator.create("Individual", list, fitness=creator.FitnessMin)

toolbox = base.Toolbox()
toolbox.register("attr_bool", np.random.randint, 0, 1)
toolbox.register("individual", tools.initRepeat, creator.Individual, toolbox.attr_bool, n=27)
toolbox.register("population", tools.initRepeat, list, toolbox.individual)


def decode_chromosome(chromosome):
    # Decode the binary chromosome to actual process parameters
    # This is a placeholder for the actual decoding logic
    return np.array(chromosome)


# Use the trained neural network to calculate fitness
def evaluate(individual, model):
    params = decode_chromosome(individual)
    shrinkage = model.predict(params.reshape(1, -1))
    return (1 / shrinkage[0])  # Fitness function is the reciprocal of shrinkage


toolbox.register("mate", tools.cxTwoPoint)
toolbox.register("mutate", tools.mutFlipBit, indpb=0.05)
toolbox.register("select", tools.selTournament, tournsize=3)


def main():
    # Generate synthetic training data for the neural network
    X_train = np.random.rand(100, 27)
    y_train = np.random.rand(100)

    # Create and train the neural network
    model = create_neural_network(27)
    train_neural_network(model, X_train, y_train)
    print( train_neural_network(model, X_train, y_train))
    # Set the trained model to the GA evaluation function
    toolbox.register("evaluate", evaluate, model=model)

    # Create an initial population
    population = toolbox.population(n=27)
    ngen = 40
    cxpb = 0.5
    mutpb = 0.2

    for gen in range(ngen):
        offspring = algorithms.varAnd(population, toolbox, cxpb=cxpb, mutpb=mutpb)
        fits = toolbox.map(toolbox.evaluate, offspring)
        for fit, ind in zip(fits, offspring):
            ind.fitness.values = fit
        population = toolbox.select(offspring, k=len(population))
    best_individual = tools.selBest(population, k=1)
    best_params = decode_chromosome(best_individual)
    print(f'Best process parameters: {best_params}')

    # Run the genetic algorithm
    # algorithms.eaSimple(population, toolbox, cxpb, mutpb, ngen)

    # Get the best solution
    # best_individual = tools.selBest(population, k=1)[0]
    # best_params = decode_chromosome(best_individual)
    # print(f'Best process parameters: {best_params}')


if __name__ == "__main__":
    main()

# class Quality:
#     def quality(self):
#         return self.quality
