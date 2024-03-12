const { createClient } = require('@supabase/supabase-js');

class SupabaseConnector {
    constructor() {
        if (!SupabaseConnector.instance) {
            this.client = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY);
            SupabaseConnector.instance = this;
        }
        return SupabaseConnector.instance;
    }

    static getInstance() {
        if (!SupabaseConnector.instance) {
            SupabaseConnector.instance = new SupabaseConnector();
        }
        return SupabaseConnector.instance;
    }

    getClient() {
        return this.client;
    }
}

module.exports = SupabaseConnector;