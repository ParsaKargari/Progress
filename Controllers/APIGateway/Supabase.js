const { createClient } = require('@supabase/supabase-js');
class SupabaseConnector {
    constructor() {
        if (!SupabaseConnector.instance) {
            this.client = createClient(
                process.env.REACT_APP_SUPABASE_URL,
                process.env.REACT_APP_SUPABASE_ANON_KEY
            );
            SupabaseConnector.instance = this;
        }
        return SupabaseConnector.instance;
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new SupabaseConnector();
        }
        return this.instance;
    }

    getClient() {
        return this.client;
    }
}

const supabaseSingleton = SupabaseConnector.getInstance();
let a = supabaseSingleton.getClient();
a.from('Users').select('*').then(console.log).catch(console.error);