import supabaseClient from '@/utils/supabaseClient';

export async function sbEmailSignup(email, password) {
    const { data, error } = await supabaseClient.auth.signUp({
        email:email, password: password,
    })
    return {
        data, error
    }
}

export async function sbEmailSignin(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email:email, password: password,
    })
    return {
        data, error
    }
}

export async function sbSignOut() {
    const signout = await supabaseClient.auth.signOut();
    return signout;
}