from recbole.config import Config
from recbole.data import create_dataset, data_preparation
from recbole.model.sequential_recommender import GRU4Rec
from recbole.trainer import Trainer

def main():

    best_params = {
        'dropout_prob': 0.1,
        'hidden_size': 128,
        'learning_rate': 0.01,
        'num_layers': 1,
    }

    config = Config(
        config_file_list=["configs/config.yaml", "configs/base.yaml", "configs/dataset.yaml"],
        config_dict=best_params,
    )

    dataset = create_dataset(config)
    
    train_data, valid_data, test_data = data_preparation(config, dataset)
    
    model = GRU4Rec(config, train_data.dataset).to(config['device'])
    
    trainer = Trainer(config, model)

    best_valid_score, best_valid_result = trainer.fit(
        train_data,
        valid_data,
        saved=True,
        show_progress=True
    )

    test_result = trainer.evaluate(test_data)
    
    print('Best Valid Result:')
    print(best_valid_result)
    print('Test Result:')
    print(test_result)

if __name__ == '__main__':
    main()
