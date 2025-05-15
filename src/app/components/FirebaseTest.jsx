import { useEffect, useState } from 'react';
import { db } from '../auth/services/firebase/initializeFirebase';

function FirebaseTest() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await db.collection('products').limit(1).get();
        if (!snapshot.empty) {
          setData(snapshot.docs[0].data());
        } else {
          setData('No data found');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Firebase Connection Test</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default FirebaseTest;