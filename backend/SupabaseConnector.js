const { createClient } = require('@supabase/supabase-js');
var env = require('dotenv').config();
class SupabaseConnector {
    constructor() {
        if (!SupabaseConnector.instance) {
            this.client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
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