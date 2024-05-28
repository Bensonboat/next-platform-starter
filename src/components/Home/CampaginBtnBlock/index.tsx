import Image from "next/image";
import style from "./index.module.sass";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ICampaign } from "pages/home";

interface ICampaignBtnBlockProps {
    campaignList: ICampaign[];
    setCampaignList: Dispatch<SetStateAction<ICampaign[]>>;
}

const CampaignBtnBlock = (props: ICampaignBtnBlockProps) => {
    const perPage = 3;
    const [pageData, setPageData] = useState<any[]>([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const updatePagination = (page: number) => {
        let next = currentPage + page;
        if (next <= 0) {
            next = 1;
        }
        if (next >= totalPage) {
            next = totalPage;
        }
        setCurrentPage(next);
    };

    useEffect(() => {
        console.log(props.campaignList, "props.campaignList");
        if (props.campaignList.length === 0) {
            return;
        }

        const total = Math.ceil(props.campaignList.length / perPage);
        setTotalPage(total);

        if (currentPage === 0) {
            setCurrentPage(1);
        }
    }, [props.campaignList]);

    useEffect(() => {
        console.log(currentPage, "currentPage");
        let start = (currentPage - 1) * perPage;
        setPageData(props.campaignList.slice(start, perPage * currentPage));
    }, [props.campaignList, totalPage, currentPage]);

    const selectCampaign = (id: number) => {
        let old = JSON.parse(JSON.stringify(props.campaignList));
        let parsed = old.map((item: ICampaign) => {
            let selected = false;
            if (item.id === id) {
                selected = true;
            }
            return {
                ...item,
                isSelected: selected,
            };
        });

        props.setCampaignList(parsed);
    };

    return (
        <div className={style.campaignBtnBlock}>
            <div className={`${style.arrowBtn} ${style.left}`}>
                <Image
                    fill
                    src="/icon/campaign_btn_left.svg"
                    alt="btn"
                    onClick={() => updatePagination(-1)}
                />
            </div>
            <div className={`${style.arrowBtn} ${style.right}`}>
                <Image
                    fill
                    src="/icon/campaign_btn_right.svg"
                    alt="btn"
                    onClick={() => updatePagination(1)}
                />
            </div>
            {pageData.map((item, index) => {
                return (
                    <div
                        className={style.btn}
                        key={index}
                        onClick={() => selectCampaign(item.id)}
                    >
                        <Image
                            fill
                            src={
                                item.isSelected
                                    ? "/icon/campaign_btn_selected.svg"
                                    : "/icon/campaign_btn.svg"
                            }
                            alt="btn"
                            className={style.bg}
                        />
                        <div className={style.btnName}>{item.label}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default CampaignBtnBlock;
