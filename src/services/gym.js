const baseUrl = '/api/exercise'
const loginUrl = '/api/login'

let token = null

const login = async credentials => {
    return await fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
}

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const createExercise = async exerciseData => {
    try {
        const response = await fetch(baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(exerciseData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al crear ejercicio');
        }

        return await response.json();
    } catch (error) {
        console.error('Error completo:', error);
        throw error;
    }
}

const getExercises = async () => {
    const response = await fetch(baseUrl, {
        headers: {
            "Authorization": token
        }
    });

    if (!response.ok) {
        throw new Error('Error al obtener ejercicios');
    }

    return await response.json();
}

const updateExercise = async (id, exerciseData) => {
    try {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify(exerciseData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al actualizar ejercicio');
        }

        return await response.json();
    } catch (error) {
        console.error('Error completo:', error);
        throw error;
    }
}

const deleteExercise = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": token
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al eliminar ejercicio');
        }
    } catch (error) {
        console.error('Error completo:', error);
        throw error;
    }
}

export default { login, setToken, createExercise, getExercises, updateExercise, deleteExercise }