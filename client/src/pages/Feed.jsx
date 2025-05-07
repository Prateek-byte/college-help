import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  Link,
  CircularProgress,
} from "@mui/material";

export default function Feed() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/resources")
      .then((res) => setResources(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box mt={4}>
      <Paper sx={{ p: 2 }} elevation={3}>
        <Typography variant="h5" mb={2}>
          Resources
        </Typography>
        <List>
          {resources.map((r) => (
            <ListItem key={r._id}>
              <Link
                href={r.url}
                target="_blank"
                rel="noopener"
                underline="hover"
              >
                {r.title}
              </Link>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({r.scope})
              </Typography>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
