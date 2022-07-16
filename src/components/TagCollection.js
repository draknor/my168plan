import Tag from './Tag';

const TagCollection = () => {
  const tags = [
    { id: 1, name: "Sleep" },
    { id: 2, name: "Eat" },
    { id: 3, name: "Family Time" },
    { id: 4, name: "Work" },
    { id: 5, name: "Recreation" },
  ];

  return (
    <div className="tagCollection">
      <h3>Tags</h3>
      <ul>
        { tags.map((tag) => {
          return (
            <Tag key={tag.id} tag={tag}/>
          )
        })}
      </ul>
    </div>

  );
}

export default TagCollection;