import { Grid } from "@mui/material";
import { VoiceActor } from "../../types/VoiceActor";
import Card from "../card/Card";

type VoiceActorListProps = {
  actors: VoiceActor[];
  keyword: string;
};

const SearchResults: React.FC<VoiceActorListProps> = ({ actors, keyword }) => {
  return (
    <>
      <Grid
        container
        spacing={2}
        alignItems="stretch"
        data-testid="search-results"
      >
        {actors.length &&
          actors.map((actor) => (
            <Card key={actor.id} actor={actor} keyword={keyword} />
          ))}
      </Grid>
    </>
  );
};
export default SearchResults;
