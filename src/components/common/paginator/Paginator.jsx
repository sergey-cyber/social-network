import React, { useEffect, useState } from 'react';
import style from './paginator.module.css';

const Paginator = ({totalItemsCount, pageSize, currentPage, onPageCganged, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount/portionSize);
    let [portionNumber, serPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber-1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize; 

    return (
        <div className={style.pageSelectControl}>
            {portionNumber > 1 &&
            <button onClick={() => {serPortionNumber(portionNumber-1)}} >Prev</button>}

            {pages.filter((p) => p>=leftPortionPageNumber && p<=rightPortionPageNumber)
                .map((p) => {
                    return <span className={currentPage === p && style.selectedPage}
                        onClick={() => {
                            onPageCganged(p)
                        }}>{p}</span>
            })}
            {portionCount > portionNumber && 
                <button onClick={() => {serPortionNumber(portionNumber+1)}}>Next</button>}
        </div>
    )
}

export default Paginator;