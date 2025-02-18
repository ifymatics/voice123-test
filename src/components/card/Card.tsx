import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import AudioPlayer from "../audioPlayer/AudioPlayer";
// import { Link } from "react-router-dom";

interface VoiceActor {
  user: {
    picture_small: string;
    username: string;
    name: string;
  };
  relevant_sample: {
    file: string;
  };
  summary?: string;
}

interface VoiceActorCardProps {
  actor: VoiceActor;
  keyword: string;
}
const Card: React.FC<VoiceActorCardProps> = ({ actor, keyword }) => {
  const filterParagraph = (paragraph: string) => {
    const keywords = keyword.toLowerCase().split(" ");
    return keywords.some((word) => paragraph.toLowerCase().includes(word));
  };

  const getSummary = () => {
    if (!actor.summary) {
      return "Summary not available 😞";
    }

    const paragraphs = actor.summary.split("\n");
    const filtered = paragraphs.filter(filterParagraph);

    if (!filtered.length) {
      return paragraphs[0];
    }

    const keywords = keyword.split(" ");
    return keywords.reduce(
      (text, word) =>
        text.replace(
          new RegExp(`\\b${word}\\b`, "gi"),
          (match) => `<strong>${match}</strong>`
        ),
      filtered[0]
    );
  };

  return (
    <Grid item xs={12} sm={6} data-testid="card">
      <Paper
        style={{
          borderRadius: "12px",
          paddingLeft: "2rem",
        }}
      >
        <List>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <ListItem sx={{ minHeight: 80 }}>
              <ListItemAvatar>
                <Avatar src={actor.user.picture_small} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <a
                    href={`https://voice123.com/${actor.user.username}`}
                    color="inherit"
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    {actor.user.name}
                  </a>
                }
              />
            </ListItem>
            <ListItem>
              <AudioPlayer file={actor.relevant_sample.file} />
            </ListItem>
          </Grid>
          <ListItem style={{ minHeight: "5rem", padding: "0px .5rem" }}>
            <Typography
              variant="body2"
              color="textSecondary"
              component="div"
              dangerouslySetInnerHTML={{ __html: getSummary() }}
            />
          </ListItem>
        </List>
      </Paper>
    </Grid>
  );
};

export default Card;
