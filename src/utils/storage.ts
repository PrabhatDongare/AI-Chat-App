import { type ChatState, DEFAULT_CHAT_STATE } from "../types/chat";

const STORAGE_KEY = "chat_state";

export function loadChatState(): ChatState {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);

        if (!raw) {
            return DEFAULT_CHAT_STATE;
        }

        const parsed = JSON.parse(raw);

        if (!parsed.sessions || !Array.isArray(parsed.sessions)) {
            return DEFAULT_CHAT_STATE;
        }

        return parsed as ChatState;
    } catch {
        return DEFAULT_CHAT_STATE;
    }
}

export function saveChatState(state: ChatState): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
        console.error("Storage is full — clear some space before proceeding.");
    }
}

export function isStorageAvailable(): boolean {
    try {
        // dummy data to check storage is full
        const testKey = "__storage_test__";
        const testValue = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium corrupti inventore ut vero officia alias odit itaque numquam ad quam repellat nisi, sapiente ratione, quisquam fugit, aut mollitia nobis voluptas? Harum quos dolores ea inventore sit beatae velit voluptate molestias non laudantium excepturi earum, exercitationem aliquid, nihil minima nisi delectus impedit necessitatibus deleniti, dolorem aut error debitis. Ex ipsam tempora, libero quidem consectetur ut officiis asperiores beatae recusandae ullam distinctio saepe, quod facilis sequi iste quam molestias? Tenetur earum eius nihil facilis sunt incidunt dignissimos minima nostrum accusantium quasi esse fugiat, veritatis dolorem maiores nam. Accusantium quam suscipit non ea laborum facere molestiae veritatis officiis vel, libero reiciendis tempore consectetur illo sint vero, repellendus eveniet temporibus maiores modi minima totam. Voluptates ipsa quam, nostrum alias eveniet, qui aliquam saepe distinctio iure omnis dolorum. Accusantium corrupti provident vitae? Enim in eos perferendis iusto adipisci odit nesciunt, odio ex sequi? Quidem soluta, eius tenetur nesciunt vitae est architecto aperiam tempora minus eum, praesentium nihil quas dolorem quia eveniet iure non magnam doloremque! Necessitatibus ipsum voluptate consectetur illo sunt ad, cumque blanditiis, accusantium fugiat adipisci quo delectus pariatur officia itaque quod facere. Omnis minus quas nemo illum sunt natus ad, quod eveniet quis labore nesciunt. Architecto obcaecati ad vero fugiat cupiditate, illo necessitatibus? Quae sapiente recusandae consequatur, cum fugiat debitis voluptatem excepturi nostrum aspernatur fuga, nam, nemo quidem expedita incidunt labore necessitatibus accusantium! Quia temporibus dolore optio voluptatum delectus rem, dolores provident consequuntur atque incidunt reprehenderit, nulla quibusdam, sed voluptas obcaecati. Ratione commodi perferendis quibusdam id, iste quos in facere nam dolore optio quasi tenetur neque distinctio eum porro facilis nostrum ipsum assumenda nisi magni quaerat, soluta expedita! Animi quae qui unde quasi temporibus facere quos alias debitis aliquam provident neque illum, quibusdam maxime veniam saepe quia sequi exercitationem dolorum eaque rem repellat est earum! Pariatur animi neque iusto repellat omnis amet ex doloremque doloribus soluta. Amet ratione necessitatibus, perspiciatis nesciunt neque quod veritatis quasi illum excepturi voluptatem nihil facilis placeat suscipit fugiat molestias, dolorem quidem veniam! Corporis atque tempore sunt illum quo, ipsum exercitationem quis rerum porro, temporibus obcaecati molestias eligendi beatae cum eveniet sapiente explicabo? Nulla deleniti quidem nesciunt eos nihil omnis hic assumenda quos id repellendus, labore consequuntur, modi similique corporis possimus praesentium sed in libero blanditiis facere molestiae sit provident aut laudantium! Cum debitis magnam, corporis quo consectetur laudantium quasi, ex voluptas, nemo distinctio asperiores. Quod nemo eveniet rem. Ipsam repellendus voluptatum facere impedit perspiciatis sed iure non velit similique. Similique aspernatur ipsum, quod minus iste distinctio, dolorem nostrum quos consequuntur deserunt saepe ut eos aliquam delectus eveniet, eum animi veritatis perspiciatis cumque sequi cum debitis! Earum sed dolorum nulla aut dicta quod est laborum nesciunt, tenetur nisi. Facilis dolore perspiciatis, sit obcaecati rem distinctio. Fugiat porro accusantium laboriosam excepturi necessitatibus sapiente nulla incidunt optio maiores blanditiis, repellat voluptatum commodi quisquam corporis eligendi tenetur aut, nihil error voluptas consequuntur. Asperiores dolore soluta deleniti eum sunt excepturi, explicabo nemo fugiat ex culpa maxime, exercitationem impedit laboriosam accusamus. Minus, magnam aliquid?";
        localStorage.setItem(testKey, testValue);
        localStorage.removeItem(testKey);
        return true;
    } catch {
        return false;
    }
}
