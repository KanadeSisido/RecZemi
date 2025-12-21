from recbole.config import Config
from recbole.data import create_dataset, data_preparation

if __name__ == "__main__":
    config = Config(model='GRU4Rec', dataset='beverages-1m', config_file_list=["configs/base.yaml", 'configs/dataset.yaml'])
    dataset = create_dataset(config)
    train_data, valid_data, test_data = data_preparation(config, dataset)