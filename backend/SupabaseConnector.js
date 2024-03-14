const { createClient } = require('@supabase/supabase-js');

class SupabaseConnector {
    constructor() {
        if (!SupabaseConnector.instance) {
            this.client = createClient('https://opibjtddqpdpnytgulvm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9waWJqdGRkcXBkcG55dGd1bHZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1MDU1MzUsImV4cCI6MjAyMjA4MTUzNX0.bzwZbig3eS8EiUof8ium4yDVIm607IlGL0xq6vaYiEU');
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