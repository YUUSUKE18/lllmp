public class Main {
    public static void main(String[] args) {
        int target = Integer.parseInt(System.in);
        int count = 0;
        int[] numbers = new int[100000]; // 64bit 整数の最大値を考慮
        int n = numbers.length;

        for (int i = 0; i < n; i++) {
            int num = Integer.parseInt(System.in);
            if (num != target) {
                for (int j = i + 1; j < n; j++) {
                    int sum = numbers[i] + numbers[j];
                    if (sum == target) {
                        count++;
                    }
                }
            }
        }

        System.out.println("pairs=" + count);
    }
}
