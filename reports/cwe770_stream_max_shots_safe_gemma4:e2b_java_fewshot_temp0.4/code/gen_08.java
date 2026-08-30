import java.io.BufferedInputStream;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedInputStream in = new BufferedInputStream(System.in, 1 << 16);
        byte[] buf = new byte[1 << 16];
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean foundFirst = false;
        int c = 0;
        boolean inNumber = false;
        long currentNumber = 0;

        int n;
        while ((n = in.read(buf)) > 0) {
            for (int i = 0; i < n; i++) {
                int b = buf[i] & 0xff;

                if (b == ',') {
                    if (inNumber) {
                        c++;
                        if (currentNumber > max) {
                            max = currentNumber;
                        }
                        currentNumber = 0;
                        inNumber = false;
                    }
                } else if (b >= '0' && b <= '9') {
                    // Read the number
                    currentNumber = currentNumber * 10 + (b - '0');
                    inNumber = true;
                } else if (inNumber) {
                    // If we encounter a non-digit and we were reading a number, it's an invalid sequence, ignore it.
                    inNumber = false;
                    currentNumber = 0;
                }
            }
        }

        // Handle the last number if the input doesn't end with a comma
        if (inNumber) {
            c++;
            if (currentNumber > max) {
                max = currentNumber;
            }
        }

        // If no numbers were found, count is 0 and max should be handled appropriately.
        // Since the problem implies reading a sequence of integers separated by commas,
        // if c=0, we output 0 for count and potentially MIN_VALUE or handle based on context.
        // Assuming if no valid integers are found, max remains Long.MIN_VALUE, but since we only care about existing numbers:
        if (c == 0) {
            max = 0; // If there are no elements, the max is undefined in a strict sense, but 0 is a safe default if we must output something.
        }

        System.out.println("count=" + c + " max=" + max);
    }
}
