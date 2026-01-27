/* =========================================
       2. 自定义导航栏 (方框包裹优化)
       ========================================= */
    .custom-nav {
        position: sticky;
        top: 0;
        z-index: 9999;
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 15px 0;
        margin-bottom: 40px;
        background: transparent; /* 移除外层全宽背景 */
    }
    
    .nav-container {
        display: flex;
        gap: 10px; /* 缩小间距，防止过宽 */
        align-items: center;
        justify-content: center;
        /* --- 重点：添加背景和边框到容器 --- */
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(0,0,0,0.06);
        box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        padding: 8px 20px;
        border-radius: 50px; /* 圆角胶囊风格，也可以改小 */
        width: fit-content;  /* 宽度根据内容自适应 */
        max-width: 95vw;     /* 移动端保护，防止溢出屏幕 */
    }

    /* 桌面端强制不换行 */
    @media (min-width: 768px) {
        .nav-container {
            flex-wrap: nowrap;
        }
    }
    
    /* 移动端允许换行并调整样式 */
    @media (max-width: 767px) {
        .nav-container {
            flex-wrap: wrap;
            gap: 10px;
            border-radius: 16px; /* 移动端换行后使用较小圆角 */
            justify-content: space-around;
        }
    }

    .nav-link {
        color: #4b5563;
        text-decoration: none !important;
        font-weight: 600;
        font-size: 14px; /* 稍微缩小字号以适应更多标签 */
        display: flex;
        align-items: center;
        gap: 6px;
        transition: all 0.2s;
        padding: 6px 12px;
        border-radius: 8px;
        white-space: nowrap; 
    }
