# Web Programming HW#9


同學您好，感謝你願意花時間認真審閱我的作業。

在此作業中，我把作業七部署至以下網域 
https://chaty-production.up.railway.app/ 

作業七 README 如下：

請跟隨以下指示

1. 登入/註冊頁面

    a. 表單（使用者名稱、密碼）檢驗，若有任一未填，給予適當錯誤訊息。

    b. 輸入使用者名稱＆密碼，若 DB 中不存在相同名稱之使用者，則自動註冊並儲存（意即不可存在兩個名稱相同之使用者）。此外，密碼經簡易加密（單純字元平移）傳至後端並儲存。

    c. 若後端驗證成功，則回傳所有該使用者資料至前端；失敗，則回傳前端錯誤訊息。

    d. 後端阻止同個用戶於多個裝置（或多個分頁、瀏覽器等）登入。

2. 私人訊息

    a. 點擊左側 SideBar `Friends` 選項，每個使用者必定是自己的朋友，也因此滿足基本要求，可與自己聊天。

    b. 點擊左側 SideBar `Add Friend` 選項，並輸入其他已註冊用戶名稱。若輸入有效，則好友列表將立即更新，並可開始聊天；輸入無效，則跳出錯誤訊息（皆有後端邏輯）。

3. 群組訊息

    a. 點擊左側 SideBar `New Group` 選項，並輸入群組名稱，並選擇要加入群組的好友。群組名稱可重複，並可正常獨立運作。

    b. 點擊左側 SideBar `Groups` 選項，並選擇一個群組發送訊息，群組內其他使用者皆會收到訊息。

4. 彈跳通知

    a. 收到訊息時，若該訊息不屬於目前開啟的頻道，則會跳出彈跳通知，並附帶回覆按鈕，按下即可進入聊天室回覆。

5. 個人資料

    a. 點擊左側 SideBar `My Profie` 選項，查看個人資料，顯示的密碼來自前端解碼後端加密過的密碼。

    b. 點擊個人資料頁面下方 `Log out` 按鈕登出。退回登入/註冊畫面，並記住使用者名稱。


再次感謝您寶貴的時間，祝您身體健康、學期順利！