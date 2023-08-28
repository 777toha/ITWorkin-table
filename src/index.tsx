import React, { FC, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useAppSelector, useAppDispatch } from './store/typeHook';
import './index.css';
import Table from './components/Table/Table';
import { fetchData, setCurrentPage, setSelectedApi } from './store/dataSlice/dataSlice';
import { Loader } from './components/Loader/Loader';
import SelectorApi from './components/Selector/SelectorApi';
import SelectorPageApi from './components/Selector/SelectorPageApi';

const Root: FC = () => {
  const dispatch = useAppDispatch();
  const { data, headers, currentPage, totalPages, selectedApi, selectedPageSize } = useAppSelector((state) => state.data);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setShowLoader(true);

    const fetchDataAndHideLoader = async () => {
      await dispatch(
        fetchData({
          selectedApi,
          currentPage,
          selectedPageSize,
        })
      );
      setTimeout(() => {
        setShowLoader(false);
      }, 1000);
    };

    fetchDataAndHideLoader();
  }, [dispatch, selectedApi, currentPage, selectedPageSize]);

  const handleApiSelect = (api: string) => {
    dispatch(setSelectedApi(api));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="app">
      {showLoader ? (
        <Loader />
      ) : (
        <>
          <div className="selector-container">
            <SelectorApi options={['location', 'character']} onSelect={handleApiSelect} />
            <SelectorPageApi
              options={Array.from({ length: totalPages }, (_, i) => String(i + 1))}
            />
          </div>
          <Table data={data} headers={headers} />
        </>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>
);
