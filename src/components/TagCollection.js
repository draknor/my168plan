import Tag from './Tag';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box"
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import {TagDisplay} from "./Tag";

const TagCollection = (props) => {
  const tags = props.tags

  return (
    <Box sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper'}}>
      <Typography variant="h4" gutterBottom>
        Tags
      </Typography>
      <Stack direction={"row"} spacing={2}>
        { tags.map((tag) => {
          return (
            <TagDisplay key={tag.id} tag={tag}/>
          )
        })}
      </Stack>
    </Box>
  );
}

export default TagCollection;
