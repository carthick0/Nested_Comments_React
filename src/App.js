import NestedComments from "./componets/nested_comments";
import "./styles.css";
import commentsData from "./data/comments.json";
export default function App() {
  return (
    <div className="App">
      <h1>Nested Comments</h1>
      <NestedComments
        comments={commentsData}
        onSubmit={(content) => {}}
        onEdit={(content) => {}}
        onDelete={(content) => {}}
        // onUpVote={() => {}}
        // onDownVote={() => {}}
      />
    </div>
  );
}
