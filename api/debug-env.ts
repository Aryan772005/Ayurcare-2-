export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const nvidiaKey = process.env.NVIDIA_API_KEY;
  
  res.status(200).json({
    hasNvidiaKey: !!nvidiaKey,
    keyLength: nvidiaKey ? nvidiaKey.length : 0,
    keyPrefix: nvidiaKey ? nvidiaKey.substring(0, 8) + '...' : 'NOT SET',
    nodeEnv: process.env.NODE_ENV || 'not set',
    vercel: process.env.VERCEL || 'not set',
    allEnvKeys: Object.keys(process.env).filter(k => k.includes('NVIDIA') || k.includes('nvidia')),
  });
}
