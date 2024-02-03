import random
import string

def generate_random_id(length):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))

def is_id_exist(filename, generated_id):
    try:
        with open(filename, 'r') as file:
            return generated_id in file.read().splitlines()
    except FileNotFoundError:
        return False

def save_id_to_file(filename, name, generated_id):
    with open(filename, 'a') as file:
        file.write(f"{name}: {generated_id}\n")

def generate_unique_id(filename, name):
    while True:
        new_id = generate_random_id(20)
        if not is_id_exist(filename, new_id):
            save_id_to_file(filename, name, new_id)
            return new_id

if __name__ == "__main__":
    filename = "./other/generated_character_ids.txt"
    name = input("Enter a name: ")
    unique_id = generate_unique_id(filename, name)
    print(f"Generated Unique ID for {name}: {unique_id}")
