import Image from "next/image";
import style from "./index.module.sass";
import { ICampaignDetailBlock } from "pages/home";
import { useEffect, useState } from "react";

interface ICampaignDetailBlockProps {
    selectedCampaign: ICampaignDetailBlock;
}

const CampaignInfoBlock = (props: ICampaignDetailBlockProps) => {
    const [img, setImg] = useState("");
    const [showLargeImage, setShowLargeImage] = useState(false);

    const createMarkup = (content: any) => {
        return { __html: content };
    };

    useEffect(() => {
        if (
            !props.selectedCampaign.activity ||
            props.selectedCampaign.activity.id === 0
        ) {
            return;
        }

        const url = props.selectedCampaign.activity.prize_content
            .slice(props.selectedCampaign.activity.prize_content.indexOf("src"))
            ?.split("=")[1]
            ?.split(" ")[0];
        setImg(url?.toString());
    }, [props.selectedCampaign]);

    return (
        <div className={style.campaignInfoBlock}>
            {showLargeImage && (
                <>
                    <div
                        className={style.largeImageBg}
                        onClick={() => setShowLargeImage(false)}
                    ></div>
                    <div
                        className={style.bigRewardImg}
                        style={{
                            backgroundImage: `url(${img})`,
                            backgroundRepeat: "no-repeat",
                        }}
                    ></div>
                </>
            )}
            <div className={style.infoBlock}>
                <div className={style.titleBlock}>
                    <div className={style.rewardInfoBg}>
                        <Image
                            fill
                            src="/icon/mobile_reward_info.svg"
                            alt="row"
                            className={style.rewardInfoBg}
                        />
                    </div>
                    <div className={style.title}>獎品資訊</div>
                </div>
                <div className={style.detailsInfoBlock}>
                    <div
                        className={style.rewardImage}
                        style={{
                            backgroundImage: `url(${img})`,
                        }}
                        onClick={() => setShowLargeImage(true)}
                    ></div>
                    <div
                        className={`${style.customContentBlock} ${style.rewardCustomContent}`}
                        dangerouslySetInnerHTML={createMarkup(
                            props.selectedCampaign.activity.prize_content
                        )}
                    ></div>
                </div>
            </div>
            <div className={style.infoBlock}>
                <div className={style.titleBlock}>
                    <div className={style.rewardInfoBg}>
                        <Image
                            fill
                            src="/icon/mobile_reward_info.svg"
                            alt="row"
                            className={style.rewardInfoBg}
                        />
                    </div>
                    <div className={style.title}>活動說明</div>
                </div>
                <div className={style.detailsInfoBlock}>
                    <div
                        className={style.customContentBlock}
                        dangerouslySetInnerHTML={createMarkup(
                            props.selectedCampaign.activity.description
                        )}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default CampaignInfoBlock;
