import React, { useCallback, useContext, useEffect, useState } from 'react';
import { removeDiacritics } from '@/utils/format/index.ts';
import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity.ts';
import RecipeService from '@/lib/services/recipeService.ts';
import AppContext from '@/lib/contexts/AppContext.ts';
import { TuKhoa } from '../../../pages/Search.tsx';
import {
  RecipeSearchReq,
  initRecipeSearchReq,
} from '@/lib/models/dtos/Request/RecipeSearchReq/RecipeSearchReq.ts';
import { SortType } from './SortSelect.tsx';

export function useSearchRecipe(viewportItemAmount: number = 12) {
  const [recipes, setRecipes] = React.useState<RecipeEntity[]>([]);
  // const [resultIds, setResultIds] = React.useState<RecipeEntity['id'][]>([]);
  const { handleSpinner } = useContext(AppContext);
  const [page, setPage] = React.useState(1);
  const [end, setEnd] = React.useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await RecipeService.GetAllRecipes(
          viewportItemAmount,
          page
        );
        const tukhoa = (await RecipeService.GetKeyWords())
          .map((item) => {
            return {
              ...item,
              value: false,
            };
          })
          .slice(0, 12);
        setTuKhoas(tukhoa);

        setRecipes(data.filter((item) => item && !item.is_private));
      } catch (error) {
        console.log(error);
        handleSpinner(false);
      }
    }
    fetchData();
  }, []);

  //#region Search
  const [textSearch, setTextSearch] = React.useState('');

  const handleChangeTextSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value == '') {
        setEnd(false);
      } else setEnd(true);
      setTextSearch(event.target.value);
    },
    []
  );
  const handleTextSearch = useCallback(
    (item?: RecipeEntity) => {
      if (!item) return false;

      const value = textSearch;
      if (!value || value == '') {
        return true;
      }

      const str = JSON.stringify([
        item?.name,
        item?.rating,
        item?.totalTime,
        item?.serving_size,
        item?.introduction,
        item?.author_note,
        item?.account?.name,
        item?.ingredients?.map((i) => i.name),
        item?.direction?.map((i) => i.direction),
      ]);

      return removeDiacritics(str.toLocaleLowerCase()).includes(
        removeDiacritics(value.toLocaleLowerCase())
      );
    },
    [textSearch]
  );

  //#endregion

  //#region Filter
  const [filter, setFilter] =
    React.useState<RecipeSearchReq>(initRecipeSearchReq);

  function handleChangeFilter<T extends keyof RecipeSearchReq>(
    type: T,
    value: RecipeSearchReq[T]
  ) {
    const newFilter = {
      ...filter,
      [type]: value,
    };
    console.log(newFilter);

    setFilter(newFilter);
  }

  useEffect(() => {
    async function fetchData() {
      handleSpinner(true);

      setTextSearch('');
      const newData = await RecipeService.SearchRecipes({
        ...filter,
        page: 1,
        pageSize: viewportItemAmount,
      });

      setPage(1);
      setRecipes(newData);
      if (newData.length < viewportItemAmount) setEnd(true);
      else setEnd(false);
      window.scrollTo(0, 50 + 64 + 160);

      handleSpinner(false);
    }
    fetchData();
  }, [filter]);

  function resetFilter() {
    setFilter(initRecipeSearchReq);
    setTextSearch('');
    setSortType(null);
    setTuKhoas((prev) =>
      prev.map((item) => {
        return {
          ...item,
          value: false,
        };
      })
    );
  }

  //#endregion

  //#region Từ khóa
  const [tuKhoas, setTuKhoas] = React.useState<TuKhoa[]>([]);
  console.log(tuKhoas);

  const handleChangeTuKhoa = (tukhoa: TuKhoa) => {
    const newTuKhoas = [...tuKhoas].map((item) => {
      if (item.keyword === tukhoa.keyword) {
        return {
          ...item,
          value: !item.value,
        };
      } else {
        return item;
      }
    });
    setTuKhoas(newTuKhoas);
    let keyWords: RecipeSearchReq['KeyWords'] = newTuKhoas
      .map((item) => {
        if (item.value && item.keyword) {
          return removeDiacritics(item.keyword);
        }
      })
      .filter(Boolean);
    handleChangeFilter('KeyWords', keyWords.length == 0 ? null : keyWords);
  };

  //#endregion

  //#region Infinite Scroll
  const loadNext = useCallback(async () => {
    if (end) return;
    let nextData: RecipeEntity[] = [];
    nextData = await RecipeService.SearchRecipes({
      ...filter,
      page: page + 1,
      pageSize: viewportItemAmount,
    });

    setPage((prev) => prev + 1);
    setRecipes((prev) => [...prev, ...nextData]);
    if (nextData.length < viewportItemAmount) setEnd(true);
  }, [recipes]);
  //#endregion

  //#region sort
  const [sortType, setSortType] = useState<SortType | null>(null);
  function handleSort(sortType: SortType | null) {
    setSortType(sortType);

    const { type, sort } = sortType ? sortType : { type: 'name', sort: 'asc' };

    const newRecipes = [...recipes].sort((a, b) => {
      if (Object.keys(a).includes(type) && Object.keys(b).includes(type)) {
        if (a[type] == null && b[type] == null) {
          return 0;
        }
        if (a[type] < b[type]) {
          return sort == 'asc' ? -1 : 1;
        }
        if (a[type] > b[type]) {
          return sort == 'asc' ? 1 : -1;
        }
      }
      return 0;
    });
    setRecipes(newRecipes);
  }

  //#endregion

  return {
    recipes:
      recipes && recipes.length > 0 ? recipes.filter(handleTextSearch) : [],
    filter,
    resetFilter,
    handleChangeFilter,
    textSearch,
    handleChangeTextSearch,
    handleTextSearch,
    tuKhoas,
    handleChangeTuKhoa,
    loadNext,
    end,
    sortType,
    handleSort,
  };
}
