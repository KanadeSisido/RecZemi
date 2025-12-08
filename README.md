Docker用Recbole開発環境
=======================
このリポジトリは、Dockerを使用してRecboleの開発環境を構築するための設定ファイルを提供しています。これにより、簡単にRecboleの開発環境をセットアップし、すぐに開発を始めることができます。

## 前提条件
- Dockerがインストールされていること
  - インストール方法については、[Docker公式サイト](https://www.docker.com/get-started)を参照してください。
- Gitがインストールされていること
  - インストール方法については、[Git公式サイト](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)を参照してください。

## セットアップ手順
1. このリポジトリをクローンします。
    ```bash
    git clone https://github.com/KanadeSisido/Recbole-Env.git
    ```
2. クローンしたディレクトリに移動します。
    ```bash
    cd Recbole-Env
    ```
3. Dockerイメージをビルドします。
    ```bash
    docker compose up -d --build
    ```
4. コンテナが起動したら、次を実行すれば自動でコンテナに接続します。
    ```bash
    activate.sh
    ```
5. Recboleの開発を開始します。`src/main.py`を編集して、Recboleのコードを変更できます。
6. 開発が終わったら、コンテナから脱出し、コンテナを停止します。
    - コンテナから脱出するには、以下のコマンドを実行します。
    ```bash
    exit
    ```
    - コンテナを停止するには、以下のコマンドを実行します
    ```bash
    docker compose down
    ```
## 注意事項
- このリポジトリはRecboleの公式リポジトリではありません
