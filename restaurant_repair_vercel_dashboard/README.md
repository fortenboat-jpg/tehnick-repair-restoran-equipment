# Restaurant Repair Dashboard — Vercel / Next.js MVP

Красивый дашборд для поиска клиентов на ремонт ресторанного оборудования.

## Что есть
- CRM по ресторанам Tampa Bay
- Карточки лидов вместо сухой таблицы
- Воронка продаж
- Графики по типам клиентов
- Калькулятор estimate
- Генератор текста estimate для SMS/email
- Статусы: New, Called, No Answer, Estimate Sent, Won, Lost
- Готово для Vercel

## Запуск локально
```bash
npm install
npm run dev
```

Открой:
```bash
http://localhost:3000
```

## Деплой на Vercel
1. Создай новый GitHub репозиторий.
2. Загрузи файлы проекта.
3. На Vercel нажми Add New Project.
4. Выбери репозиторий.
5. Framework: Next.js.
6. Deploy.

## Следующий этап
- Подключить Supabase database.
- Подключить Google Places API для поиска ресторанов.
- Подключить Gmail/Twilio для отправки estimate.
- Сделать PDF estimate.
