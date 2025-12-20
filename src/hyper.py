from recbole.trainer import HyperTuning
from recbole.quick_start import objective_function
from utils.color import GREEN, color_text


def main():
    print(color_text('Hyper Parameter Optimizationを開始します...', GREEN))
    hp = HyperTuning(
        objective_function=objective_function,
        algo='bayes',
        early_stop=10,
        max_evals=50,
        params_file="model.hyper",
        fixed_config_file_list=["configs/hyper.yaml", "configs/base.yaml"]
    )

    print(color_text('Hyper Parameter Optimizationを実行中...', GREEN))

    hp.run()
    hp.export_result(output_file='hyper.result')

    print('best Params: ', hp.best_params)
    print('best result: ')
    print(hp.params2result[hp.params2result(hp.best_params)])


if __name__ == '__main__':
    main()