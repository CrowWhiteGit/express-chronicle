
import History from './containers/History';
import Important from './containers/Important';
import Header from './containers/Header';
import { useEffect, useState } from 'react';

const PAGES = {
  History: "history",
  Important: "important"
}

function App() {
  const [page, setPage] = useState(PAGES.History);

  const onPageChange = (newPage) => {
    setPage(newPage);
  }

  return (
    <div className="App">
      <Header onClick={onPageChange} />
      {page === PAGES.History && <History />}
      {page === PAGES.Important && <Important />}
    </div>
  );
}

export default App;
