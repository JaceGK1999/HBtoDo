const SUPABASE_URL = 'https://uhmsxsfarryniihsuyry.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVobXN4c2ZhcnJ5bmlpaHN1eXJ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY0NDg1ODk5NSwiZXhwIjoxOTYwNDM0OTk1fQ.6nj7bcX8HwQyFQNgiIoCcY6u37Gv4ctD0Ivcfo9zsKQ';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function createTodo(todo) {
    const response = await client
        .from('todos')
        .insert({
            todo: todo,
            complete: false,
            user_id: client.auth.user().id,
        })
        .single();
    // create a single incomplete todo with the correct 'todo' property for this user in supabase

    return checkError(response);
}

export async function deleteAllTodos() {
    await client.from('todos').delete().match({ user_id: client.auth.user().id });
    // delete all todos for this user in supabase

    return checkError(response);
}

export async function getTodos() {
    // get all todos for this user from supabase

    return checkError(response);
}

export async function completeTodo(id) {
    // find the and update (set complete to true), the todo that matches the correct id

    return checkError(response);
}

export async function getUser() {
    return client.auth.session();
}

export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../');
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./todos');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
