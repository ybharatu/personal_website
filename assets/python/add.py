import sys

if __name__ == "__main__":
	c = "Error"
	c = sys.argv[1] + sys.argv[2]

	print(c)
	sys.stdout.flush()