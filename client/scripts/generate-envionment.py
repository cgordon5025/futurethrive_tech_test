import hashlib
import json
import uuid
import argparse
import os.path
import subprocess


def env_to_json_file(env_path, tgt_path, additional):
    environment = additional
    with open(tgt_path, "w") as out_file:
        with open(env_path, "r") as in_file:
            key, value = in_file.readline().split("=")
            environment[key] = value

        serialized = json.dumps(environment, indent=2)
        out_file.write(serialized)


def env_to_javascript_file(env_path, tgt_path, additional):
    environment = additional
    with open(tgt_path, "w") as out_file:
        with open(env_path, "r") as in_file:
            for line in in_file.readlines():
                key, value = line.split("=")
                environment[key.strip()] = value.strip()

        serialized = json.dumps(environment, indent=2)
        data = "window.__env = " + serialized + ";"
        out_file.write(data)


def hash_file(src_path):
    block = bytearray(64 * 1024)
    memory_view = memoryview(block)
    h = hashlib.sha256()
    with open(src_path, "rb", buffering=0) as file:
        while True:
            data = file.readinto(memory_view)
            if not data:
                break

            h.update(memory_view[:data])

    return h.hexdigest()


def read_package_json(file_path):
    with open(file_path, "r") as file:
        json_data = file.read()

    package = json.loads(json_data)
    checksum = hash_file(file_path)

    data = {
        "APP_ID": "0.0.0.0.0",
        "APP_NAME": package["name"],
        "APP_VERSION": package["version"],
        "APP_PACKAGE_HASH": checksum,
        "APP_PACKAGE_HASH_ID": str(uuid.UUID(checksum[::2])),
        "APP_HASH": git_get_last_commit_hash()[::1]
    }

    return data


def validate_arguments(a):
    env_path_exists = os.path.exists(a.env_path)
    out_path_exists = os.path.exists(os.path.dirname(a.out_path))
    pkg_json_exists = os.path.exists(a.pkg_json)

    message = f'''
    One or more of the paths provided are not valid: 
        1. env path exists? {env_path_exists}
        2. out path exists? {out_path_exists}
        3. pkg path exists? {pkg_json_exists}

    Generation process cannot start unless all paths are valid'''

    if not env_path_exists or not out_path_exists or not pkg_json_exists:
        raise Exception(message)


def git_get_last_commit_hash():
    checksum = subprocess.check_output("git rev-parse HEAD", text=True, shell=True)
    return checksum.strip()


if __name__ == '__main__':

    parser = argparse.ArgumentParser(prog="JsEnvGenerator", description='''
        Generated a JSON object which is intended to be injected into a 
        Javascript Application''')

    parser.add_argument("-e", "--env-path", help="environment file (.env) path")
    parser.add_argument("-o", '--out-path', help='''
        output file path. Note: the file extension provided in the path
        name will dictate if the saved file is either Javascript or JSON''')

    parser.add_argument("-p", "--pkg-json", help="package.json file path")

    args = parser.parse_args()

    validate_arguments(args)

    pkg_json_path = args.pkg_json
    env_file_path = args.env_path
    out_file_path = args.out_path
    out_file_type = out_file_path.find(".js") > 0 and "javascript" or "json"

    configuration = read_package_json(pkg_json_path)

    if out_file_type == "javascript":
        env_to_javascript_file(env_file_path, out_file_path, configuration)
    else:
        env_to_json_file(env_file_path, out_file_path, configuration)
