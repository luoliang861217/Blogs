$(document).ready(function() {
    lists = $('.split-list');
    lists.each(function() {
        left = document.createElement('ul');
        left.className = 'list-left';
        right = document.createElement('ul');
        right.className = 'list-right';

        list = this.children[0].children;
        length = list.length;

        for (i = 0; i < length / 2; ++i) {
            left.appendChild(list[0])
        }

        for (;i < length; ++i) {
            right.appendChild(list[0])
        }

        this.innerHTML = "";

        this.appendChild(left);
        this.appendChild(right);
    });
});
