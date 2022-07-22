import Tag from './Tag';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box"
import List from "@mui/material/List";

const TagCollection = () => {
  const tags = TagArray();

  return (
    <Box sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper'}}>
      <Typography variant="h4" gutterBottom>
        Tags
      </Typography>
      <List>
        { tags.map((tag) => {
          return (
            <Tag key={tag.id} tag={tag}/>
          )
        })}
      </List>
    </Box>
  );
}

export default TagCollection;

export const TagArray = () => {
  const tags = [
    { id: 1, name: "Sleep" },
    { id: 2, name: "Eat" },
    { id: 3, name: "Family Time" },
    { id: 4, name: "Work" },
    { id: 5, name: "Recreation" },
  ];

  return tags;
}