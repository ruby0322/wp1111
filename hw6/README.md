# Web Programming HW#6

基本及進階要求皆全數完成

- 將原 App 單一頁面分爲四個 Tabs
    - QUERY       查詢頁面：查找資料庫中「完全」匹配的卡片
    - FILTER      篩選頁面：隱藏資料庫中不匹配的卡片
    - ADD/UPDATE  更新頁面：新增或更新資料庫中的卡片
    - DELETE      刪除頁面：清空資料庫
- 在 QUERY 及 FILTER 頁面，可自行根據任意屬性排序，再按一次可改變順序（升/降冪）
    - 點擊 NAME：根據姓名依字典序排序
    - 點擊 SUBJECT：根據科目名稱依字典序排序
    - 點擊 SCORE：根據成績高低排序
- UX 改善：FILTER Tab 的篩選功能即時更新，無需按任何按鈕，更直覺且效率。

更新：
我的可排序表格是手刻的，寫完才發現原來 Material UI 有提供現成的 Component <DataGrid /> 有超多厲害的功能，欲哭無淚QQ
