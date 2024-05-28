import Image from "next/image";
import style from "./index.module.sass";
import { ICampaignDetailBlock } from "pages/home";

interface ICampaignDetailBlockProps {
    selectedCampaign: ICampaignDetailBlock;
}

const MobileRankList = (props: ICampaignDetailBlockProps) => {
    return (
        <div className={style.mobileRankList}>
            <div className={style.bg}>
                <Image fill src="/icon/mobile_ranking_bg.svg" alt="btn" />
            </div>
            <div className={style.prizes}>
                <div className={style.prizeBlock}>
                    <div className={style.prizeBlock}>
                        <div
                            className={`${style.prizeIcon} ${style.prizeIcon2}`}
                        >
                            <Image
                                fill
                                src="/icon/mobile_prize_2.svg"
                                alt="btn"
                                className={style.bg}
                            />
                        </div>
                        <div className={style.name}>
                            {props.selectedCampaign.rank[1].name}
                        </div>
                        <div className={style.score}>
                            {props.selectedCampaign.rank[1].value}
                        </div>
                    </div>
                </div>
                <div className={style.prizeBlock}>
                    <div className={style.prizeBlock}>
                        <div
                            className={`${style.prizeIcon} ${style.prizeIcon1}`}
                        >
                            <Image
                                fill
                                src="/icon/mobile_prize_1.svg"
                                alt="btn"
                                className={style.bg}
                            />
                        </div>
                        <div className={style.name}>
                            {" "}
                            {props.selectedCampaign.rank[0].name}
                        </div>
                        <div className={style.score}>
                            {" "}
                            {props.selectedCampaign.rank[0].value}
                        </div>
                    </div>
                </div>
                <div className={style.prizeBlock}>
                    <div className={style.prizeBlock}>
                        <div
                            className={`${style.prizeIcon} ${style.prizeIcon3}`}
                        >
                            <Image
                                fill
                                src="/icon/mobile_prize_3.svg"
                                alt="btn"
                                className={style.bg}
                            />
                        </div>
                        <div className={style.name}>
                            {" "}
                            {props.selectedCampaign.rank[2].value}
                        </div>
                        <div className={style.score}>
                            {" "}
                            {props.selectedCampaign.rank[2].value}
                        </div>
                    </div>
                </div>
            </div>
            {props.selectedCampaign.rank.slice(3).map((item, key) => {
                return (
                    <div className={style.rankingRow} key={key}>
                        <div className={`${style.rankingRowBg}`}>
                            <Image
                                fill
                                src="/icon/mobile_ranking_row.svg"
                                alt="row"
                                className={style.rankingRowBg}
                            />
                        </div>
                        <div className={style.txt}>{item.order}</div>
                        <div className={`${style.txt}`}>{item.name}</div>
                        <div className={style.txt}>{item.value}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default MobileRankList;
