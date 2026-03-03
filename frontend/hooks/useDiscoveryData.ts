import { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:4070';

export interface FeedItem {
  id: string;
  type: 'clip' | 'announcement' | 'tournament';
  title: string;
  description: string;
  imageUrl?: string;
  timestamp: string;
  author: string;
}

export interface DiscoveryData {
  feed: FeedItem[];
  trending: FeedItem[];
  tournaments: FeedItem[];
}

export const useDiscoveryData = () => {
  const [data, setData] = useState<DiscoveryData>({ feed: [], trending: [], tournaments: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetching all three categories at the same level as requested
        const [feedRes, trendingRes, tournamentsRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/v1/feed`),
          axios.get(`${BACKEND_URL}/api/v1/trending`),
          axios.get(`${BACKEND_URL}/api/v1/tournaments`),
        ]);

        setData({
          feed: feedRes.data.items || [],
          trending: trendingRes.data.items || [],
          tournaments: tournamentsRes.data.items || [],
        });
      } catch (err: any) {
        console.error('Error fetching discovery data:', err);
        setError(err.message || 'Failed to fetch discovery data');
        
        // Fallback for MVP if API is not yet available
        setData({
          feed: [
            {
              id: '1',
              type: 'clip',
              title: 'Insane Clutch in Off The Grid!',
              description: 'Watch 0xGridMaster wipe the squad with a prototype rifle.',
              author: '0xGridMaster',
              timestamp: '2h ago'
            },
            {
              id: '2',
              type: 'announcement',
              title: 'Shrapnel Season 3 Live',
              description: 'New extraction zones and weapon skins are now available.',
              author: 'Shrapnel Official',
              timestamp: '5h ago'
            }
          ],
          trending: [
            {
              id: '3',
              type: 'clip',
              title: 'DeFi Kingdoms Duel',
              description: 'Top tier hero battle for Crystal resources.',
              author: 'HeroSlayer',
              timestamp: '1h ago'
            }
          ],
          tournaments: [
            {
              id: '4',
              type: 'tournament',
              title: 'AVAX Invitational',
              description: '$10k Prize Pool. Register your squad now.',
              author: 'Avalanche Gaming',
              timestamp: 'Ends in 2d'
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
