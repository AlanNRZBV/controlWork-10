create table news
(
    id         int auto_increment
        primary key,
    title      varchar(255)                       not null,
    content    text                               not null,
    image      varchar(255)                       null,
    created_at datetime default CURRENT_TIMESTAMP null
);

insert into cw10.news (id, title, content, image, created_at)
values  (1, 'Test title 1', 'test content 1', '7714f0f7-21b8-4cd2-9761-5213f56fec0d.jpg', '2024-02-03 12:58:34'),
        (2, 'Test title 2', 'test content 2', null, '2024-02-03 12:58:34'),
        (3, 'Test title 3', 'test content 3', null, '2024-02-03 12:58:34'),
        (6, 'this news will be deleted', 'this news will be deleted', null, '2024-02-03 14:24:11');
create table comments
(
    id      int auto_increment
        primary key,
    news_id int                              not null,
    author  varchar(255) default 'Anonymous' not null,
    content text                             not null,
    constraint posts_news_id_fk
        foreign key (news_id) references news (id)
            on delete cascade
);

insert into cw10.comments (id, news_id, author, content)
values  (1, 1, 'Anonymous', 'anonymous author content'),
        (2, 1, 'John Doe', 'John Doe was here'),
        (3, 2, 'Anonymous', 'another anonymous author content'),
        (4, 3, 'Jane Doe', 'Jane Doe was here'),
        (5, 2, 'John Smith', 'John Smith was here'),
        (6, 3, 'Anonymous', 'yet another anonymous author content'),
        (14, 1, 'NotNull', 'another test comment');