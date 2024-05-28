import Image from "next/image";
import style from "./index.module.sass";
import { ICampaignDetailBlock } from "pages/home";

interface ICampaignDetailBlockProps {
    selectedCampaign: ICampaignDetailBlock;
    dd: string;
    hh: string;
    mm: string;
    ss: string;
    highlightStage: number;
    milliseconds: string;
    isCampaignEnded: boolean;
}

const DesktopCampaignDetailBlock = (props: ICampaignDetailBlockProps) => {
    return (
        <div
            className={`${style.desktopCampaignDetailBlock} ${
                props.highlightStage === 1 ? style.yellow : ""
            } ${props.highlightStage === 2 ? style.red : ""}`}
        >
            <div className={style.section}>
                <Image
                    fill
                    src="/icon/desktop_campaign_bg.svg"
                    alt="btn"
                    className={style.bg}
                />
                <div className={style.contentBlock}>
                    <div className={style.title}>
                        {props.selectedCampaign.activity.main_title}
                    </div>
                    <div className={style.description}>
                        {props.selectedCampaign.activity.sub_title}
                    </div>
                </div>
            </div>
            {!props.isCampaignEnded ? (
                <div className={style.section}>
                    <Image
                        fill
                        src="/icon/desktop_campaign_bg_2.svg"
                        alt="btn"
                        className={style.bg}
                    />
                    <div className={style.timeBlock}>
                        {props.highlightStage !== 2 && (
                            <div className={style.period}>
                                <div className={style.time}>
                                    <div className={style.timeSlot}>
                                        <div className={style.timeSlotIcon}>
                                            <Image
                                                fill
                                                src="/icon/time_slot.svg"
                                                alt="slot"
                                            />
                                        </div>
                                        <div className={style.txt}>
                                            {props.dd.substring(0, 1)}
                                        </div>
                                    </div>
                                    <div className={style.timeSlot}>
                                        <div className={style.timeSlotIcon}>
                                            <Image
                                                fill
                                                src="/icon/time_slot.svg"
                                                alt="slot"
                                            />
                                        </div>
                                        <div className={style.txt}>
                                            {props.dd.substring(1, 2)}
                                        </div>
                                    </div>
                                </div>
                                <div className={style.timeLabel}>DAYS</div>
                            </div>
                        )}
                        <div className={style.period}>
                            <div className={style.time}>
                                <div className={style.timeSlot}>
                                    <div className={style.timeSlotIcon}>
                                        <Image
                                            fill
                                            src="/icon/time_slot.svg"
                                            alt="slot"
                                        />
                                    </div>
                                    <div className={style.txt}>
                                        {props.hh.substring(0, 1)}
                                    </div>
                                </div>
                                <div className={style.timeSlot}>
                                    <div className={style.timeSlotIcon}>
                                        <Image
                                            fill
                                            src="/icon/time_slot.svg"
                                            alt="slot"
                                        />
                                    </div>
                                    <div className={style.txt}>
                                        {props.hh.substring(1, 2)}
                                    </div>
                                </div>
                            </div>
                            <div className={style.timeLabel}>HOURS</div>
                        </div>
                        <div className={style.period}>
                            <div className={style.time}>
                                <div className={style.timeSlot}>
                                    <div className={style.timeSlotIcon}>
                                        <Image
                                            fill
                                            src="/icon/time_slot.svg"
                                            alt="slot"
                                        />
                                    </div>
                                    <div className={style.txt}>
                                        {props.mm.substring(0, 1)}
                                    </div>
                                </div>
                                <div className={style.timeSlot}>
                                    <div className={style.timeSlotIcon}>
                                        <Image
                                            fill
                                            src="/icon/time_slot.svg"
                                            alt="slot"
                                        />
                                    </div>
                                    <div className={style.txt}>
                                        {props.mm.substring(1, 2)}
                                    </div>
                                </div>
                            </div>
                            <div className={style.timeLabel}>MINUTES</div>
                        </div>
                        <div className={style.period}>
                            <div className={style.time}>
                                <div className={style.timeSlot}>
                                    <div className={style.timeSlotIcon}>
                                        <Image
                                            fill
                                            src="/icon/time_slot.svg"
                                            alt="slot"
                                        />
                                    </div>
                                    <div className={style.txt}>
                                        {props.ss.substring(0, 1)}
                                    </div>
                                </div>
                                <div className={style.timeSlot}>
                                    <div className={style.timeSlotIcon}>
                                        <Image
                                            fill
                                            src="/icon/time_slot.svg"
                                            alt="slot"
                                        />
                                    </div>
                                    <div className={style.txt}>
                                        {props.ss.substring(1, 2)}
                                    </div>
                                </div>
                            </div>
                            <div className={style.timeLabel}>SECONDS</div>
                        </div>
                        {props.highlightStage === 2 && (
                            <div className={style.period}>
                                <div className={style.time}>
                                    <div className={style.timeSlot}>
                                        <div className={style.timeSlotIcon}>
                                            <Image
                                                fill
                                                src="/icon/time_slot.svg"
                                                alt="slot"
                                            />
                                        </div>
                                        <div className={style.txt}>
                                            {props.milliseconds.substring(0, 1)}
                                        </div>
                                    </div>
                                    <div className={style.timeSlot}>
                                        <div className={style.timeSlotIcon}>
                                            <Image
                                                fill
                                                src="/icon/time_slot.svg"
                                                alt="slot"
                                            />
                                        </div>
                                        <div className={style.txt}>
                                            {props.milliseconds.substring(1, 2)}
                                        </div>
                                    </div>
                                </div>
                                <div className={style.timeLabel}>
                                    MILLISECONDS
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className={`${style.section}`}>
                    <Image
                        fill
                        src="/icon/desktop_campaign_bg_2.svg"
                        alt="btn"
                        className={style.bg}
                    />
                    <div className={` ${style.closeNote}`}>
                        {props.selectedCampaign.activity.close_note}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DesktopCampaignDetailBlock;
