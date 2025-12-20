from recbole.quick_start import load_data_and_model
from recbole.data.interaction import Interaction
import argparse
import torch

CHECKPOINT_FILE = 'saved/GRU4Rec-Dec-13-2025_23-13-07.pth'
ITEM_FILE = 'ml-100k.item'
CONFIG_FILE_LIST = ["configs/config.yaml", "configs/base.yaml"]

def inference_from_checkpoint():
    
    config, model, dataset, train_data, valid_data, test_data = load_data_and_model( CHECKPOINT_FILE )

    print(f"設定をロード: model={config['model']}, dataset={config['dataset']}")

    item_sequence = ['1', '50', '100']  # 例としてのアイテムIDシーケンス
    item_length = len(item_sequence)
    pad_length = 50

    try:
        token_sequence = dataset.token2id(dataset.iid_field, item_sequence)
    except KeyError as e:
        print(f"エラー: アイテムIDがデータセットに存在しません。詳細: {e}")
        return

    padded_item_sequence = torch.nn.functional.pad(
        torch.tensor(token_sequence),
        (0, pad_length - item_length),
        "constant",
        0
    )

    input_interaction = Interaction({
        "item_id_list": padded_item_sequence.reshape(1, -1),
        "item_length": torch.tensor([item_length]),
    })

    input_interaction = input_interaction.to(model.device)
    scores = model.full_sort_predict(input_interaction)
    # 最もスコアが「低い」ものを推薦する
    top_k = torch.topk(scores, k=10, largest=False)

    tk_cpu = top_k.indices.to("cpu")
    tk = tk_cpu.numpy()
    recom_list = dataset.id2token(dataset.iid_field, tk[0])

    print("入力アイテムシーケンス:", item_sequence)
    print("推薦アイテムリスト:", recom_list)



if __name__ == '__main__':
    # チェックポイント指定
    parser = argparse.ArgumentParser()
    parser.add_argument('--checkpoint', type=str, required=False, help='ロードするチェックポイントファイルのパス')
    parser.add_argument('--item_file', type=str, required=False, help='アイテムファイルのパス')
    
    args = parser.parse_args()

    CHECKPOINT_FILE = args.checkpoint if args.checkpoint else CHECKPOINT_FILE
    ITEM_FILE = args.item_file if args.item_file else ITEM_FILE

    inference_from_checkpoint()