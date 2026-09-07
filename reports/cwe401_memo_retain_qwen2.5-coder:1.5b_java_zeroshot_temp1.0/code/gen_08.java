import java.util.HashMap;

public class Main {
    public static void main(String[] args) {
        HashMap<Integer, Integer> memo = new HashMap<>();
        int total = 0;

        for (int i = 0; i < args.length; i++) {
            int number = Integer.parseInt(args[i]);
            total += calculateSteps(number, memo);
        }

        System.out.println("total=" + total);
    }

    private static int calculateSteps(int number, HashMap<Integer, Integer> memo) {
        if (number == 1) {
            return 0;
        }

        if (memo.containsKey(number)) {
            return memo.get(number);
        }

        int steps;
        if (number % 2 == 0) {
            steps = 1 + calculateSteps(number / 2, memo);
        } else {
            steps = 1 + calculateSteps(3 * number + 1, memo);
        }

        memo.put(number, steps);
        return steps;
    }
}
