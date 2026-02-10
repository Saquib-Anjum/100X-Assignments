# Assignment 1 - Age old question — How to center a div

![Screenshot 2026-01-16 at 6.12.43 PM.png](https://file.notion.so/f/f/085e8ad8-528e-47d7-8922-a23dc4016453/369e08e2-35a8-45b7-b9d1-107d637a839c/Screenshot_2026-01-16_at_6.12.43_PM.png?table=block&id=2ea7dfd1-0735-8042-8b71-dcb242486d73&spaceId=085e8ad8-528e-47d7-8922-a23dc4016453&expirationTimestamp=1770472800000&signature=BORp7B72NpZZf6B_L-fLa1DPovYTOUf19dgfdfGKAJM&downloadName=Screenshot+2026-01-16+at+6.12.43%E2%80%AFPM.png)

## mild solution

```jsx
<html>
    <head>
        <title>Elevenlabs | Signup</title>
        <link href="./index.css" rel="stylesheet">
        <style>
            body {
                font-family: "Roboto", sans-serif;
                font-weight: 800;
                background: black;
                color: white;
                padding: 0;
                margin: 0;
            }
        </style>
    </head>
    <body>
        <div style="min-height: 100vh; display: flex; flex-direction: column;">
            <div>
                header
            </div>
            <div style="flex: 1; background-color: red; display: flex; justify-content: center; align-items: center; height: 100%; background-color: green;">
                <span style="border: 1px solid black; padding: 20;">
                    Create an account
                    <div style="height: 1px; background-color: black; margin-top: 10;">

                    </div>
                    <input type="text" style="border: 1px solid gray; padding: 10; margin: 10; border-radius: 10px;" />
                </span>
            </div>
            <div>
                footer
            </div>
        </div>
    </body>
</html>

```
