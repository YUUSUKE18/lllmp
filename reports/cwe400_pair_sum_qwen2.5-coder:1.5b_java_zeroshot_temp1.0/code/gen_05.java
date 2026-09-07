public class Main {
    public static void main(String[] args) {
        int target = Integer.parseInt(args[0]);
        int count = 0;
        int[] numbers = new int[Integer.parseInt(args[1])];

        for (int i = 1; i <= args[1]; i++) {
            String line = args[i];
            for (char ch : line.toCharArray()) {
                if (ch == ' ') continue;
                numbers[count++] = ch - '0';
                if (count == 2) break;
            }
        }

        for (int i = 0; i < numbers.length; i++) {
            for (int j = i + 1; j < numbers.length; j++) {
                if (numbers[i] + numbers[j] == target) {
                    count++;
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
