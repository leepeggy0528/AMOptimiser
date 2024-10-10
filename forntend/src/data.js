const questions = [
        {
        id: 0,
        cate:'quality',
        problem: "How to optimize additive manufacturing parameters for high quality production?",
        description: `It uses a Q-learning algorithm to learn the best combinations of parameters, 
        such as laser power, scan speed, and hatch spacing, to maximize a specific reward function. 
        The environment also considers various material properties, such as thermal diffusivity, 
        thermal conductivity, and surface tension, to simulate realistic manufacturing conditions. `,
        limitation: [".png, .jpg, .jpeg"],
      },
        {
        id: 1,
        cate:'quality',
        problem: "How to optimize additive manufacturing parameters for high quality production?",
        description: `It uses a Q-learning algorithm to get the best combinations of parameters, 
        such as laser power, scan speed, and hatch spacing.
        The default material is Aluminium alloy, if you want to change the material, you should prepare its parameters 
        ( Powder bed thickness, Initial/Melting/Boiling temperature, Absorptivity, Density, Specific heat capacity, 
        Thermal diffusivity, Laser spot deviation, Thermal conductivity, Latent heat of fusion, Surface tension, Dynamic viscosity)`,
        limitation: [".csv", "Table fields must be have min_power, max_power, interval_power, min_speed, max_speed, interval_speed, min_hatch, max_hatch, interval_hatch "],
      },
        {
        id: 2,
        cate:'quality',
        problem: "How to optimize additive manufacturing parameters for high quality production?",
        description: `It uses a Q-learning algorithm to get the best combinations of parameters, 
        such as laser power, scan speed, and hatch spacing.
        The default material is Aluminium alloy, if you want to change the material, you should prepare its parameters 
        ( Powder bed thickness, Initial/Melting/Boiling temperature, Absorptivity, Density, Specific heat capacity, 
        Thermal diffusivity, Laser spot deviation, Thermal conductivity, Latent heat of fusion, Surface tension, Dynamic viscosity)`,
        limitation: [".xlsx", "Table fields must be have min_power, max_power, interval_power, min_speed, max_speed, interval_speed, min_hatch, max_hatch, interval_hatch "],
      },
        {
        id: 3,
        cate:'quality',
        problem: "How to optimize additive manufacturing parameters for high quality production?",
        description: `It uses a Q-learning algorithm to get the best combinations of parameters, 
        such as laser power, scan speed, and hatch spacing.
        The default material is Aluminium alloy, if you want to change the material, you should prepare its parameters 
        ( Powder bed thickness, Initial/Melting/Boiling temperature, Absorptivity, Density, Specific heat capacity, 
        Thermal diffusivity, Laser spot deviation, Thermal conductivity, Latent heat of fusion, Surface tension, Dynamic viscosity)`,
        limitation: ["number", "At least 2 combinations of parameters"],
      }
]
export default questions