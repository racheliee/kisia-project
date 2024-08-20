import os
import sys

if len(sys.argv) > 1:
    print("입력된 첫 번째 인자:", sys.argv[1])
    url = sys.argv[1]

    # os.system(f'pipenv run python get_site_js_html_1.py {url}')
    os.system(f'python3 get_site_js_html_1.py {url}')

    # os.system('pipenv run python html2js_2.py')
    os.system('python3 html2js_2.py')

    # os.system('pipenv run python js_parsing_3.py')
    os.system('python3 js_parsing_3.py')

    os.system('rm -rf ./site_js')

    # 도메인을 기반으로 저장 경로 생성
    # domain = url.split('//')[-1].split('/')[0]
    # save_path = os.path.join('.', domain)
    # os.system(f'mv ./code_splitter_result_forder ./{save_path}')
    
    os.system('mv ./code_splitter_result_forder ./dynamic_temps')
    # os.system('pipenv run python tocsv_4.py')
    os.system('python3 tocsv_4.py')
else:
    print("인자가 입력되지 않았습니다.")