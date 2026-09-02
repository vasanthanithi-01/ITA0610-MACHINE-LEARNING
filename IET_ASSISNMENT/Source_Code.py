import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

from sklearn.model_selection import StratifiedKFold, train_test_split
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    confusion_matrix,
    ConfusionMatrixDisplay
)

# ============================================================
# 1. DATASET LOADING AND PREPROCESSING
# ============================================================

np.random.seed(42)

columns = [
    "age", "sex", "cp", "trestbps", "chol",
    "fbs", "restecg", "thalach", "exang",
    "oldpeak", "slope", "ca", "thal", "num"
]

files = [
    "processed.cleveland.data",
    "processed.hungarian.data",
    "processed.switzerland.data",
    "processed.va.data"
]

datasets = []

for file in files:
    data = pd.read_csv(
        file,
        names=columns,
        na_values="?"
    )
    datasets.append(data)

df = pd.concat(
    datasets,
    ignore_index=True
)

print("\nINITIAL DATASET")
print("Shape:", df.shape)

# Convert all columns to numeric
for col in df.columns:
    df[col] = pd.to_numeric(
        df[col],
        errors="coerce"
    )

print("Missing Values Before Processing:")
print(df.isnull().sum())

# Fill missing numerical values using median
for col in df.columns:
    df[col] = df[col].fillna(
        df[col].median()
    )

# Remove duplicates
duplicates = df.duplicated().sum()

df = df.drop_duplicates()

# Convert target into binary classification
# 0 = No Heart Disease
# 1 = Heart Disease
df["target"] = (
    df["num"] > 0
).astype(int)

df.drop(
    columns=["num"],
    inplace=True
)

print("\nFINAL DATASET")
print("Shape:", df.shape)
print("Duplicates Removed:", duplicates)

print("\nClass Distribution:")
print(df["target"].value_counts())


# ============================================================
# 2. FEATURE STANDARDISATION
# ============================================================

class StandardScalerScratch:

    def fit(self, X):

        self.mean = np.mean(
            X,
            axis=0
        )

        self.std = np.std(
            X,
            axis=0
        )

        self.std[self.std == 0] = 1

    def transform(self, X):

        return (
            X - self.mean
        ) / self.std

    def fit_transform(self, X):

        self.fit(X)

        return self.transform(X)


# ============================================================
# 3. MULTILAYER PERCEPTRON
# ============================================================

class MLP:

    def __init__(
        self,
        input_size=13,
        hidden1=16,
        hidden2=8,
        learning_rate=0.01
    ):

        self.input_size = input_size
        self.hidden1 = hidden1
        self.hidden2 = hidden2
        self.lr = learning_rate

        self.W1 = (
            np.random.randn(
                input_size,
                hidden1
            ) * 0.1
        )

        self.b1 = np.zeros(
            (1, hidden1)
        )

        self.W2 = (
            np.random.randn(
                hidden1,
                hidden2
            ) * 0.1
        )

        self.b2 = np.zeros(
            (1, hidden2)
        )

        self.W3 = (
            np.random.randn(
                hidden2,
                1
            ) * 0.1
        )

        self.b3 = np.zeros(
            (1, 1)
        )

    # --------------------------------------------------------
    # Activation Functions
    # --------------------------------------------------------

    def relu(self, Z):

        return np.maximum(
            0,
            Z
        )

    def relu_derivative(self, Z):

        return (
            Z > 0
        ).astype(float)

    def sigmoid(self, Z):

        Z = np.clip(
            Z,
            -500,
            500
        )

        return 1 / (
            1 + np.exp(-Z)
        )

    # --------------------------------------------------------
    # Forward Propagation
    # --------------------------------------------------------

    def forward(self, X):

        self.Z1 = (
            X @ self.W1
        ) + self.b1

        self.A1 = self.relu(
            self.Z1
        )

        self.Z2 = (
            self.A1 @ self.W2
        ) + self.b2

        self.A2 = self.relu(
            self.Z2
        )

        self.Z3 = (
            self.A2 @ self.W3
        ) + self.b3

        self.A3 = self.sigmoid(
            self.Z3
        )

        return self.A3

    # --------------------------------------------------------
    # Binary Cross Entropy Loss
    # --------------------------------------------------------

    def compute_loss(
        self,
        y,
        y_pred
    ):

        epsilon = 1e-8

        y_pred = np.clip(
            y_pred,
            epsilon,
            1 - epsilon
        )

        loss = -np.mean(

            y * np.log(y_pred)

            +

            (1 - y)
            *
            np.log(
                1 - y_pred
            )
        )

        return loss

    # --------------------------------------------------------
    # Backpropagation
    # --------------------------------------------------------

    def backward(
        self,
        X,
        y
    ):

        m = X.shape[0]

        y = y.reshape(
            -1,
            1
        )

        # Output layer
        dZ3 = self.A3 - y

        dW3 = (
            self.A2.T @ dZ3
        ) / m

        db3 = np.sum(
            dZ3,
            axis=0,
            keepdims=True
        ) / m

        # Hidden layer 2
        dA2 = (
            dZ3 @ self.W3.T
        )

        dZ2 = (
            dA2
            *
            self.relu_derivative(
                self.Z2
            )
        )

        dW2 = (
            self.A1.T @ dZ2
        ) / m

        db2 = np.sum(
            dZ2,
            axis=0,
            keepdims=True
        ) / m

        # Hidden layer 1
        dA1 = (
            dZ2 @ self.W2.T
        )

        dZ1 = (
            dA1
            *
            self.relu_derivative(
                self.Z1
            )
        )

        dW1 = (
            X.T @ dZ1
        ) / m

        db1 = np.sum(
            dZ1,
            axis=0,
            keepdims=True
        ) / m

        # Update parameters
        self.W3 -= self.lr * dW3
        self.b3 -= self.lr * db3

        self.W2 -= self.lr * dW2
        self.b2 -= self.lr * db2

        self.W1 -= self.lr * dW1
        self.b1 -= self.lr * db1

    # --------------------------------------------------------
    # Training
    # --------------------------------------------------------

    def train(
        self,
        X,
        y,
        epochs=500
    ):

        history = []

        for epoch in range(epochs):

            y_pred = self.forward(X)

            loss = self.compute_loss(
                y.reshape(-1, 1),
                y_pred
            )

            self.backward(
                X,
                y
            )

            history.append(loss)

        return history

    # --------------------------------------------------------
    # Prediction
    # --------------------------------------------------------

    def predict_proba(self, X):

        return self.forward(X).flatten()

    def predict(self, X):

        probabilities = self.predict_proba(X)

        return (
            probabilities >= 0.5
        ).astype(int)

    # --------------------------------------------------------
    # Convert Parameters to Chromosome
    # --------------------------------------------------------

    def get_parameters(self):

        return np.concatenate([
            self.W1.flatten(),
            self.b1.flatten(),
            self.W2.flatten(),
            self.b2.flatten(),
            self.W3.flatten(),
            self.b3.flatten()
        ])

    # --------------------------------------------------------
    # Set Parameters from Chromosome
    # --------------------------------------------------------

    def set_parameters(
        self,
        chromosome
    ):

        index = 0

        # W1
        size = (
            self.input_size
            *
            self.hidden1
        )

        self.W1 = chromosome[
            index:index + size
        ].reshape(
            self.input_size,
            self.hidden1
        )

        index += size

        # b1
        size = self.hidden1

        self.b1 = chromosome[
            index:index + size
        ].reshape(
            1,
            self.hidden1
        )

        index += size

        # W2
        size = (
            self.hidden1
            *
            self.hidden2
        )

        self.W2 = chromosome[
            index:index + size
        ].reshape(
            self.hidden1,
            self.hidden2
        )

        index += size

        # b2
        size = self.hidden2

        self.b2 = chromosome[
            index:index + size
        ].reshape(
            1,
            self.hidden2
        )

        index += size

        # W3
        size = self.hidden2

        self.W3 = chromosome[
            index:index + size
        ].reshape(
            self.hidden2,
            1
        )

        index += size

        # b3
        self.b3 = chromosome[
            index:index + 1
        ].reshape(
            1,
            1
        )


# ============================================================
# 4. GENETIC ALGORITHM
# ============================================================

def initialize_population(
    population_size,
    chromosome_size
):

    return np.random.normal(
        0,
        0.1,
        (
            population_size,
            chromosome_size
        )
    )


def fitness_function(
    chromosome,
    X_train,
    y_train,
    X_val,
    y_val
):

    model = MLP()

    model.set_parameters(
        chromosome
    )

    # Short training for GA fitness evaluation
    model.train(
        X_train,
        y_train,
        epochs=50
    )

    predictions = model.predict(
        X_val
    )

    return accuracy_score(
        y_val,
        predictions
    )


def tournament_selection(
    population,
    fitness_scores,
    tournament_size=3
):

    indices = np.random.choice(
        len(population),
        tournament_size,
        replace=False
    )

    best_index = indices[
        np.argmax(
            fitness_scores[indices]
        )
    ]

    return population[
        best_index
    ].copy()


def crossover(
    parent1,
    parent2
):

    beta = np.random.rand(
        len(parent1)
    )

    child = (
        beta * parent1
        +
        (1 - beta) * parent2
    )

    return child


def mutate(
    chromosome,
    mutation_rate=0.05
):

    mutation_mask = (
        np.random.rand(
            len(chromosome)
        )
        <
        mutation_rate
    )

    noise = np.random.normal(
        0,
        0.05,
        len(chromosome)
    )

    chromosome[
        mutation_mask
    ] += noise[
        mutation_mask
    ]

    return chromosome


def genetic_algorithm(
    X_train,
    y_train,
    population_size=20,
    generations=10
):

    # Create a temporary MLP
    temp_model = MLP()

    chromosome_size = len(
        temp_model.get_parameters()
    )

    population = initialize_population(
        population_size,
        chromosome_size
    )

    best_chromosome = None
    best_fitness = -1

    # Split training data for fitness evaluation
    X_ga_train, X_val, y_ga_train, y_val = train_test_split(
        X_train,
        y_train,
        test_size=0.2,
        stratify=y_train,
        random_state=42
    )

    for generation in range(generations):

        fitness_scores = np.array([

            fitness_function(
                chromosome,
                X_ga_train,
                y_ga_train,
                X_val,
                y_val
            )

            for chromosome in population
        ])

        generation_best_index = np.argmax(
            fitness_scores
        )

        generation_best_fitness = fitness_scores[
            generation_best_index
        ]

        if (
            generation_best_fitness
            >
            best_fitness
        ):

            best_fitness = (
                generation_best_fitness
            )

            best_chromosome = population[
                generation_best_index
            ].copy()

        print(
            f"Generation {generation + 1}/{generations} "
            f"| Best Fitness: {best_fitness:.4f}"
        )

        # Elitism
        new_population = [
            best_chromosome.copy()
        ]

        while (
            len(new_population)
            <
            population_size
        ):

            parent1 = tournament_selection(
                population,
                fitness_scores
            )

            parent2 = tournament_selection(
                population,
                fitness_scores
            )

            child = crossover(
                parent1,
                parent2
            )

            child = mutate(
                child
            )

            new_population.append(
                child
            )

        population = np.array(
            new_population
        )

    return best_chromosome


# ============================================================
# 5. GAUSSIAN NAIVE BAYES FROM SCRATCH
# ============================================================

class GaussianNBScratch:

    def fit(
        self,
        X,
        y
    ):

        self.classes = np.unique(y)

        self.mean = {}
        self.var = {}
        self.priors = {}

        for c in self.classes:

            X_c = X[y == c]

            self.mean[c] = np.mean(
                X_c,
                axis=0
            )

            self.var[c] = np.var(
                X_c,
                axis=0
            ) + 1e-9

            self.priors[c] = (
                len(X_c)
                /
                len(X)
            )

    def gaussian_probability(
        self,
        X,
        mean,
        var
    ):

        numerator = np.exp(

            -(
                (X - mean) ** 2
            )

            /

            (
                2 * var
            )
        )

        denominator = np.sqrt(
            2
            *
            np.pi
            *
            var
        )

        return numerator / denominator

    def predict_proba(
        self,
        X
    ):

        probabilities = []

        for c in self.classes:

            mean = self.mean[c]
            var = self.var[c]

            likelihood = np.prod(
                self.gaussian_probability(
                    X,
                    mean,
                    var
                ),
                axis=1
            )

            posterior = (
                likelihood
                *
                self.priors[c]
            )

            probabilities.append(
                posterior
            )

        probabilities = np.array(
            probabilities
        ).T

        probabilities_sum = (
            probabilities.sum(
                axis=1,
                keepdims=True
            )
            +
            1e-10
        )

        probabilities = (
            probabilities
            /
            probabilities_sum
        )

        return probabilities

    def predict(self, X):

        probabilities = self.predict_proba(X)

        return np.argmax(
            probabilities,
            axis=1
        )


# ============================================================
# 6. DECISION FUSION
# ============================================================

def calculate_weights(
    f1_mlp,
    f1_nb
):

    total = (
        f1_mlp
        +
        f1_nb
    )

    if total == 0:

        return 0.5, 0.5

    w_mlp = (
        f1_mlp
        /
        total
    )

    w_nb = (
        f1_nb
        /
        total
    )

    return (
        w_mlp,
        w_nb
    )


def fuse_predictions(
    mlp_probabilities,
    nb_probabilities,
    w_mlp,
    w_nb
):

    final_probability = (

        w_mlp
        *
        mlp_probabilities

        +

        w_nb
        *
        nb_probabilities
    )

    final_prediction = (
        final_probability >= 0.5
    ).astype(int)

    return (
        final_probability,
        final_prediction
    )


# ============================================================
# 7. MODEL EVALUATION
# ============================================================

def evaluate_model(
    y_true,
    y_pred,
    y_probability
):

    return {

        "Accuracy":
        accuracy_score(
            y_true,
            y_pred
        ),

        "Precision":
        precision_score(
            y_true,
            y_pred,
            zero_division=0
        ),

        "Recall":
        recall_score(
            y_true,
            y_pred,
            zero_division=0
        ),

        "F1-Score":
        f1_score(
            y_true,
            y_pred,
            zero_division=0
        ),

        "ROC-AUC":
        roc_auc_score(
            y_true,
            y_probability
        )
    }


# ============================================================
# 8. 5-FOLD CROSS VALIDATION
# ============================================================

X = df.drop(
    columns=["target"]
).values.astype(float)

y = df[
    "target"
].values.astype(int)

skf = StratifiedKFold(
    n_splits=5,
    shuffle=True,
    random_state=42
)

results = {
    "Baseline MLP": [],
    "GA-Optimised MLP": [],
    "Gaussian NB": [],
    "Decision Fusion": []
}

baseline_losses = []
ga_losses = []

last_predictions = {}

fold = 1

for train_index, test_index in skf.split(X, y):

    print(
        f"\n{'=' * 60}"
    )

    print(
        f"FOLD {fold}"
    )

    print(
        f"{'=' * 60}"
    )

    X_train = X[
        train_index
    ]

    X_test = X[
        test_index
    ]

    y_train = y[
        train_index
    ]

    y_test = y[
        test_index
    ]

    # --------------------------------------------------------
    # Feature Scaling
    # --------------------------------------------------------

    scaler = StandardScalerScratch()

    X_train = scaler.fit_transform(
        X_train
    )

    X_test = scaler.transform(
        X_test
    )

    # --------------------------------------------------------
    # BASELINE MLP
    # --------------------------------------------------------

    baseline_mlp = MLP()

    baseline_history = baseline_mlp.train(
        X_train,
        y_train,
        epochs=500
    )

    baseline_prob = baseline_mlp.predict_proba(
        X_test
    )

    baseline_pred = (
        baseline_prob >= 0.5
    ).astype(int)

    baseline_result = evaluate_model(
        y_test,
        baseline_pred,
        baseline_prob
    )

    results[
        "Baseline MLP"
    ].append(
        baseline_result
    )

    # --------------------------------------------------------
    # GENETIC ALGORITHM
    # --------------------------------------------------------

    best_chromosome = genetic_algorithm(
        X_train,
        y_train,
        population_size=20,
        generations=10
    )

    # --------------------------------------------------------
    # GA-OPTIMISED MLP
    # --------------------------------------------------------

    ga_mlp = MLP()

    ga_mlp.set_parameters(
        best_chromosome
    )

    ga_history = ga_mlp.train(
        X_train,
        y_train,
        epochs=500
    )

    ga_prob = ga_mlp.predict_proba(
        X_test
    )

    ga_pred = (
        ga_prob >= 0.5
    ).astype(int)

    ga_result = evaluate_model(
        y_test,
        ga_pred,
        ga_prob
    )

    results[
        "GA-Optimised MLP"
    ].append(
        ga_result
    )

    # --------------------------------------------------------
    # GAUSSIAN NAIVE BAYES
    # --------------------------------------------------------

    nb_model = GaussianNBScratch()

    nb_model.fit(
        X_train,
        y_train
    )

    nb_prob_all = nb_model.predict_proba(
        X_test
    )

    nb_prob = nb_prob_all[:, 1]

    nb_pred = nb_model.predict(
        X_test
    )

    nb_result = evaluate_model(
        y_test,
        nb_pred,
        nb_prob
    )

    results[
        "Gaussian NB"
    ].append(
        nb_result
    )

    # --------------------------------------------------------
    # DECISION FUSION
    # --------------------------------------------------------

    w_mlp, w_nb = calculate_weights(
        ga_result["F1-Score"],
        nb_result["F1-Score"]
    )

    fusion_prob, fusion_pred = fuse_predictions(
        ga_prob,
        nb_prob,
        w_mlp,
        w_nb
    )

    fusion_result = evaluate_model(
        y_test,
        fusion_pred,
        fusion_prob
    )

    results[
        "Decision Fusion"
    ].append(
        fusion_result
    )

    # Store final fold information
    baseline_losses.append(
        baseline_history
    )

    ga_losses.append(
        ga_history
    )

    last_predictions = {

        "y_test": y_test,

        "baseline":
        baseline_pred,

        "ga":
        ga_pred,

        "nb":
        nb_pred,

        "fusion":
        fusion_pred
    }

    fold += 1


# ============================================================
# 9. FINAL RESULTS
# ============================================================

print(
    "\n\nFINAL PERFORMANCE RESULTS"
)

print(
    "=" * 70
)

final_results = {}

for model_name, model_results in results.items():

    final_results[
        model_name
    ] = {

        metric:
        np.mean([

            fold_result[
                metric
            ]

            for fold_result
            in model_results

        ])

        for metric in model_results[0]
    }

results_df = pd.DataFrame(
    final_results
).T

print(
    results_df.round(4)
)


# ============================================================
# 10. CLASS DISTRIBUTION GRAPH
# ============================================================

plt.figure(
    figsize=(7, 5)
)

df["target"].value_counts().plot(
    kind="bar"
)

plt.title(
    "Heart Disease Class Distribution"
)

plt.xlabel(
    "Class"
)

plt.ylabel(
    "Number of Patients"
)

plt.xticks(
    [0, 1],
    [
        "No Disease",
        "Disease"
    ],
    rotation=0
)

plt.tight_layout()

plt.show()


# ============================================================
# 11. TRAINING LOSS COMPARISON
# ============================================================

average_baseline_loss = np.mean(
    baseline_losses,
    axis=0
)

average_ga_loss = np.mean(
    ga_losses,
    axis=0
)

plt.figure(
    figsize=(9, 5)
)

plt.plot(
    average_baseline_loss,
    label="Baseline MLP"
)

plt.plot(
    average_ga_loss,
    label="GA-Optimised MLP"
)

plt.title(
    "Training Loss Comparison"
)

plt.xlabel(
    "Epoch"
)

plt.ylabel(
    "Binary Cross-Entropy Loss"
)

plt.legend()

plt.grid()

plt.tight_layout()

plt.show()


# ============================================================
# 12. CONFUSION MATRICES
# ============================================================

models = {

    "Baseline MLP":
    last_predictions["baseline"],

    "GA-Optimised MLP":
    last_predictions["ga"],

    "Gaussian Naive Bayes":
    last_predictions["nb"],

    "Decision Fusion":
    last_predictions["fusion"]
}

for name, prediction in models.items():

    cm = confusion_matrix(
        last_predictions["y_test"],
        prediction
    )

    display = ConfusionMatrixDisplay(
        confusion_matrix=cm
    )

    display.plot()

    plt.title(
        f"Confusion Matrix - {name}"
    )

    plt.tight_layout()

    plt.show()


# ============================================================
# 13. SAVE RESULTS
# ============================================================

results_df.to_csv(
    "model_results.csv"
)

print(
    "\nResults saved successfully "
    "as model_results.csv"
)
