'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter();

  const supabase = createClient();

  const [session, setSession] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState<any[] | null>(null);

  const fetchProfiles = async () => {
    const res = await supabase.auth.getSession()
    if (res.error) {
      router.push('/sign-in');
    }
    setLoading(true);
    const { data, error } = await supabase.from('profiles').select();
    setProfiles(data);
    setLoading(false);
  }

  useEffect(() => {
    const initialize = async () => {
      console.log('initialize');
      const { data, error } = await supabase.auth.getSession()
      setSession(data.session);
      if (!error) {
        await fetchProfiles();
      }
    };
    initialize();
  }, [])

  const handleRefresh = () => {
    // Add your refresh logic here (e.g., re-fetch data)
    console.log("Refresh button clicked");
    fetchProfiles();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Registered Users</h1>
        <p className="text-xl text-gray-600 mb-6">There are currently <span className="text-green-500 font-semibold">{profiles?.length ?? 0}</span> users.</p>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
    </div>
  )

}
