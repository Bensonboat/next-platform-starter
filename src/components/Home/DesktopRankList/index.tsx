import Image from "next/image";
import style from "./index.module.sass";
import { ICampaignDetailBlock } from "pages/home";

interface ICampaignDetailBlockProps {
    selectedCampaign: ICampaignDetailBlock;
}

const DesktopRankList = (props: ICampaignDetailBlockProps) => {
    return (
        <div className={style.desktopRankList}>
            <div className={style.bg}>
                <Image fill src="/icon/desktop_ranking_bg.svg" alt="btn" />
            </div>
            <div className={style.columnNameBlock}>
                <div className={style.column1}>
                    {props.selectedCampaign.activity.rank_title_1}
                </div>
                <div className={style.column2}>
                    {props.selectedCampaign.activity.rank_title_2}
                </div>
                <div className={style.column3}>
                    {props.selectedCampaign.activity.rank_title_3}
                </div>
            </div>
            <div></div>
            <div className={style.ranking1Row}>
                <div className={style.bg}>
                    <Image
                        fill
                        src="/icon/desktop_ranking_1_row.svg"
                        alt="icon"
                    />
                </div>
                <div className={style.icon}>
                    <Image
                        fill
                        src="/icon/desktop_ranking_1_icon.svg"
                        alt="icon"
                    />
                </div>
                <div className={style.columnValueBlock}>
                    <div className={`${style.txt} ${style.column1}`}>
                        {props.selectedCampaign.rank[0].order}
                    </div>
                    <div className={`${style.txt} ${style.column2}`}>
                        {props.selectedCampaign.rank[0].name}
                    </div>
                    <div className={`${style.txt} ${style.column3}`}>
                        {props.selectedCampaign.rank[0].value}
                    </div>
                </div>
            </div>
            <div className={style.ranking2Row}>
                <div className={style.bg}>
                    <Image
                        fill
                        src="/icon/desktop_ranking_2_row.svg"
                        alt="icon"
                    />
                </div>
                <div className={style.icon}>
                    <Image
                        fill
                        src="/icon/desktop_ranking_2_icon.svg"
                        alt="icon"
                    />
                </div>
                <div className={style.columnValueBlock}>
                    <div className={`${style.txt} ${style.column1}`}>
                        {props.selectedCampaign.rank[1].order}
                    </div>
                    <div className={`${style.txt} ${style.column2}`}>
                        {props.selectedCampaign.rank[1].name}
                    </div>
                    <div className={`${style.txt} ${style.column3}`}>
                        {props.selectedCampaign.rank[1].value}
                    </div>
                </div>
            </div>
            <div className={style.ranking3Row}>
                <div className={style.bg}>
                    <Image
                        fill
                        src="/icon/desktop_ranking_3_row.svg"
                        alt="icon"
                    />
                </div>
                <div className={style.icon}>
                    <Image
                        fill
                        src="/icon/desktop_ranking_3_icon.svg"
                        alt="icon"
                    />
                </div>
                <div className={style.columnValueBlock}>
                    <div className={`${style.txt} ${style.column1}`}>
                        {props.selectedCampaign.rank[2].order}
                    </div>
                    <div className={`${style.txt} ${style.column2}`}>
                        {props.selectedCampaign.rank[2].name}
                    </div>
                    <div className={`${style.txt} ${style.column3}`}>
                        {props.selectedCampaign.rank[2].value}
                    </div>
                </div>
            </div>
            {props.selectedCampaign.rank.slice(3).map((item, index) => {
                return (
                    <div className={style.rankingRow} key={index}>
                        <div className={style.bg}>
                            <Image
                                fill
                                src="/icon/desktop_ranking_row.svg"
                                alt="icon"
                            />
                        </div>
                        <div className={style.columnValueBlock}>
                            <div className={`${style.txt} ${style.column1}`}>
                                {item.order}
                            </div>
                            <div className={`${style.txt} ${style.column2}`}>
                                {item.name}
                            </div>
                            <div className={`${style.txt} ${style.column3}`}>
                                {item.value}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default DesktopRankList;
