export const apps = [
  {
    name: "reactjs",
    script: "node server",
    ignore_watch: ["node_modules"],
    instances: 1,
    autorestart: true,
    max_memory_restart: "1G",
    env: {
      REACT_APP_STAGE: "dev",
      PORT: 3000,
      NODE_ENV: "production",
    },
  },
];
