<template>
    <section class="footer3">
        <div class="footer-line"></div>
        <div class="container">
            <div class="media-container-row align-center">
                <div class="row row-links justify-content-center text-center">
                    <ul class="foot-menu list-inline">
                        <li class="list-inline-item foot-menu-item"><a href="#">О проекте</a></li>
                        <li class="list-inline-item foot-menu-item"><a href="#">Ресторанам/партнёрам</a></li>
                        <li class="list-inline-item foot-menu-item"><a href="#">Свяжитесь с нами</a></li>
                    </ul>
                </div>
                <div class="row row-copyright justify-content-center">
                    <p class="mbr-text mb-0 align-center">
                        Last updated on
                        <time itemprop="dateModified" datetime="2024-10-23T15:16:13.003Z">2024-10-23</time><br>
                        © Copyright 2024 Столик, пожалуйста. All Rights Reserved.
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
export default {
  name: 'FooterComponent'

};
</script>



<style>
:root {
    --background-color: #F4E2DB;
    --text-color: #000000;
    --border: #F2D4CA;
    --header-color: #000000;
    --text-color-nav: #666666;
    --background-modal: #ffffff;
    --border-hover: #F2D4CA;
    --close-icon-hover-color: #ff0000;
    --back: #ffffff;
    --icon-url: url('photo/icon.png');
}

.footer3 {
    background-color: var(--background-color);
    padding: 20px 0;
    text-align: center;
}

.row-links {
    display: flex;
    justify-content: center;
}

.foot-menu {
    display: flex;
    justify-content: center;
    padding: 0;
    margin: 0;
    list-style: none;
}


.foot-menu-item {
    margin: 0 15px;
    color: var(--text-color);
}

.foot-menu-item a {
    color: var(--text-color);
    text-decoration: none;
}

.foot-menu-item a:hover {
    text-decoration: underline;
}

.footer-line {
    height: 2px;
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%);
    width: 100%;
    margin: 0 0 20px;
}

</style>
