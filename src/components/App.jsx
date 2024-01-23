
import Searchbar from "./Searchbar/Searchbar";

export const App = () => {
  return (
    <div style={{ 
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridGap: '16px',
      paddingBottom: '24px'
    }}>
      {/* Зміст div-контейнера */}
      {/* <Post/> */}
      <Searchbar />
    </div>
  );
};
